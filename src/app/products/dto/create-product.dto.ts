import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  productName!: string;

  @ApiProperty({ required: true })
  @IsString()
  description!: string;

  @ApiProperty({ required: true })
  @IsNumber()
  value!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  discount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  images?: string[];
}
