import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products', freezeTableName: true })
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column
  productName!: string;

  @Column
  description!: string;

  @Column
  value!: number;

  @Column
  discount: number;

  @Column(DataType.ARRAY(DataType.STRING))
  images: string[];

  @Column({ type: DataType.DATE })
  createdAt!: Date;

  @Column({ type: DataType.DATE })
  updatedAt!: Date;
}
