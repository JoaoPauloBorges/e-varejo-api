import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { unlinkAsync } from 'fs-extra';
import { stat } from 'fs/promises';
import { basename, resolve } from 'path';

// For more information on ways to initialize Storage, please see
// https://googleapis.dev/nodejs/storage/latest/Storage.html


@Injectable()
export class GoogleBucketService {

  // Creates a client from a Google service account key
  // it's necessary to have the env GOOGLE_APPLICATION_CREDENTIALS setted with
  // the path of the service account key.
  private storage = new Storage();

  public async saveFile(file: string): Promise<string> {
    const originalPath = resolve(process.env.tmpFolder, file);

    const a = await stat(originalPath);
    if (!a.isFile) {
      throw new Error('Arquivo não encontrado');
    }

    const bucket = this.storage.bucket(process.env.BUCKET_NAME);

    const fileName = basename(originalPath);

    await bucket.upload(originalPath, {
      destination: fileName,
    });

    await unlinkAsync(originalPath);

    return `${process.env.BUCKET_URI}/${process.env.BUCKET_NAME}/${fileName}`;
  }

  public async deleteFile(filename: string): Promise<void> {

    const bucket = this.storage.bucket(process.env.BUCKET_NAME);
    const fileBucket = bucket.file(filename);
    const fileExists = await fileBucket.exists();

    if (fileExists && Array.isArray(fileExists) && fileExists[0]) {
      await fileBucket.delete();
    }
  }
}
