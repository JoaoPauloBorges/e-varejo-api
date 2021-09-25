import { forwardRef, Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { GoogleBucketService } from './googleBucket.service';
import { MulterModule } from '@nestjs/platform-express';
import { ProductsModule } from '@app/products/products.module';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
      preservePath: true,
    }),
    forwardRef(() => ProductsModule),
  ],
  controllers: [FilesController],
  providers: [FilesService, GoogleBucketService],
  exports: [FilesService],
})
export class FilesModule {}
