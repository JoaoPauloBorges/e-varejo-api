import { FilesService } from '@app/files/files.service';
import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { QueryListProductsDto } from './dto/query-list-products.tdo';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @Inject(forwardRef(() => FilesService)) private filesService: FilesService,
    private sequelize: Sequelize,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel
      .create(createProductDto as Product)
      .then((product) => ProductDto.product2ProductDto(product));
  }

  findAll(params: QueryListProductsDto) {
    let where: WhereOptions<Product>;

    if (!!params.search) {
      where = {
        ...where,
        [Op.or]: [
          { description: { [Op.iLike]: `${params.search}%` } },
          { productName: { [Op.iLike]: `${params.search}%` } },
        ],
      };
    }

    return this.productModel
      .findAndCountAll({
        where,
        ...params.paginate(),
      })
      .then(({ rows: data, count }) => {
        const rows = data.map((product) => ProductDto.product2ProductDto(product));
        return { rows, count };
      });
  }

  async findOne(id: number, transaction?: Transaction): Promise<Product> {
    let result: Product;
    if (!!transaction) {
      result = await this.productModel.findOne({
        where: { id },
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
    } else {
      result = await this.productModel.findOne({
        where: { id },
      });
    }

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  async possibleConcurrentUpdate(idProduct: number, publicFilename: string, transaction: Transaction) {
    const product = await this.findOne(idProduct, transaction);
    product.images = [...(product.images || []), publicFilename];
    await product.save({ transaction });
    await transaction.commit();
  }

  async updateImages(idProduct: number, publicFilename: string) {
    const t1 = await this.sequelize.transaction();
    try {
      await this.possibleConcurrentUpdate(idProduct, publicFilename, t1);
    } catch (err) {
      await t1.rollback();
      console.error('erro no update, aguardando para tentar novamente', err);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const t2 = await this.sequelize.transaction();
      try {
        await this.possibleConcurrentUpdate(idProduct, publicFilename, t2);
      } catch (err) {
        await t2.rollback();
        throw err;
      }
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.filesService.remove(product.images || []);

    await product.destroy();
  }
}
