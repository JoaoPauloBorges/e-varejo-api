import { ProductsService } from '@app/products/products.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GoogleBucketService } from './googleBucket.service';

@Injectable()
export class FilesService {
  constructor(private googleBucketService: GoogleBucketService, private productsService: ProductsService) {}

  async create(idProduct: number, file: Express.Multer.File): Promise<string> {
    try {
      const publicFilename = await this.googleBucketService.saveFile(file);
      await this.productsService.updateImages(idProduct, publicFilename);
      return publicFilename;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Erro ao realizar upload da imagem');
    }
  }

  async remove(imgs: string[]) {
    for (const img of imgs) {
      await this.googleBucketService.deleteFile(img);
    }
  }
}
