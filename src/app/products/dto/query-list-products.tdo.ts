import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import Pagination from 'src/interfaces/pagination/pagination';

export class QueryListProductsDto extends Pagination {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}
