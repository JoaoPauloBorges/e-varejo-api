import { Controller, Get, Post, Body, Param, Query, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import Page from 'src/interfaces/pagination/page';
import { QueryListProductsDto } from './dto/query-list-products.tdo';
import { ProductDto } from './dto/product.dto';

@Controller('products')
@ApiTags('Módulo Produtos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Query() params: QueryListProductsDto): Promise<Page<ProductDto>> {
    const result = await this.productsService.findAll(params);
    return new Page<ProductDto>({
      result,
      pageable: params,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.findOne(+id).then((product) => ProductDto.product2ProductDto(product));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
