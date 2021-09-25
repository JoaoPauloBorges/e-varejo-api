import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { identity } from 'rxjs';
import { CreateProductDto } from './create-product.dto';

export class ProductDto extends CreateProductDto {
  id: number;
  static product2ProductDto({ id, productName, description, value, discount, images }) {
    return {
      id: id,
      productName,
      description,
      value,
      discount,
      images: images || [],
    } as ProductDto;
  }
}
