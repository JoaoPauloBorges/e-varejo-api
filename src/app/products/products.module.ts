import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { StorageModule } from '@app/storage/storage.modute';

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
    SequelizeModule.forFeature([Product]),
    StorageModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [SequelizeModule, ProductsService],
})
export class ProductsModule {}
