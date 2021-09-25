import { Transform, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export default abstract class Pagination {
  @IsOptional()
  @Transform(({ value }) => (value <= 0 ? 1 : Number(value) || undefined))
  page;

  @IsOptional()
  @Type(() => Number)
  size;

  paginate(): { limit: number; offset: number } {
    let offset = (this.page - 1) * this.size;
    offset = Number.isNaN(offset) ? undefined : offset;
    return {
      offset,
      limit: this.size,
    };
  }
}
