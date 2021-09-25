import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { FilesModule } from '@app/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), forwardRef(() => FilesModule)],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [SequelizeModule, ProductsService],
})
export class ProductsModule {}
