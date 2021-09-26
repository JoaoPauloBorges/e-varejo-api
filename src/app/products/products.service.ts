import { GoogleBucketService } from '@app/storage/googleBucket.service';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize/types';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDto } from './dto/product.dto';
import { QueryListProductsDto } from './dto/query-list-products.tdo';
import { ProductImageOperation } from './entities/product-image-operations.enum';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private googleBucketService: GoogleBucketService,
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

  async removeProduct(id: number) {
    const product = await this.findOne(id);
    await this.removeImgsFromBucket(product.images || []);

    await product.destroy();
  }

  async removeImgFromProduct(idProduct: number, imgUrl: string) {
    const transaction = await this.sequelize.transaction();
    try {
      this.updateProductImagesList(idProduct, imgUrl, transaction, ProductImageOperation.REMOVE);
      await this.removeImgsFromBucket([imgUrl]);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  async saveImg(idProduct: number, file: Express.Multer.File): Promise<string> {
    const t1 = await this.sequelize.transaction();
    try {
      const publicFilename = await this.googleBucketService.saveFile(file);
      await this.updateProductImagesList(idProduct, publicFilename, t1, ProductImageOperation.ADD);
      await t1.commit();
      return publicFilename;
    } catch (err) {
      await t1.rollback();
      throw new InternalServerErrorException('Erro ao realizar upload da imagem');
    }
  }

  private async updateProductImagesList(
    idProduct: number,
    publicFilename: string,
    transaction: Transaction,
    op = ProductImageOperation.ADD,
  ) {
    const product = await this.findOne(idProduct, transaction);

    if (op == ProductImageOperation.ADD) {
      product.images = [...(product.images || []), publicFilename];
    } else {
      product.images = product.images.filter((img) => img !== publicFilename);
    }

    await product.save({ transaction });
  }

  private async removeImgsFromBucket(imgs: string[]) {
    for (const img of imgs) {
      await this.googleBucketService.deleteFile(img);
    }
  }
}
