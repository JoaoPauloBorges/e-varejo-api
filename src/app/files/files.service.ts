import { Injectable } from '@nestjs/common';
import { GoogleBucketService } from './googleBucket.service';

@Injectable()
export class FilesService {
  constructor(private googleBucketService: GoogleBucketService) {}
  create() {
    return 'This action adds a new file';
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
