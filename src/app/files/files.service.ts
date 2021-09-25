import { ProductsService } from '@app/products/products.service';
import { Injectable } from '@nestjs/common';
import { GoogleBucketService } from './googleBucket.service';

@Injectable()
export class FilesService {
  constructor(private googleBucketService: GoogleBucketService, private productsService: ProductsService) {}
  async create(idProduct: number, file: Express.Multer.File) {
    try {
      const publicFilename = await this.googleBucketService.saveFile(file);
      await this.productsService.updateImages(idProduct, publicFilename);
    } catch (err) {
      console.log(err);
    }
  }

  async remove(imgs: string[]) {
    for (const img of imgs) {
      await this.googleBucketService.deleteFile(img);
    }
  }
}
