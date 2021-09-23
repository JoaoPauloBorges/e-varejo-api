import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from '@app/files/files.module';
import { ProductsModule } from '@app/products/products.module';

@Module({
  imports: [FilesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
