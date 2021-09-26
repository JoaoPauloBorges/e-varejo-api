import { Module } from '@nestjs/common';
import { ProductsModule } from '@app/products/products.module';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Product } from '@app/products/entities/product.entity';

const sequelizeOptions: SequelizeModuleOptions = {
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  retryAttempts: 5,
  autoLoadModels: true,
  logging: true,
  models: [Product],
};

@Module({
  imports: [SequelizeModule.forRoot(sequelizeOptions), ProductsModule],
})
export class AppModule {}
