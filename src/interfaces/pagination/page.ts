import { ApiProperty } from '@nestjs/swagger';

interface Pageable {
  page: number;
  size: number;
}

interface IPageableParams<T> {
  result: { rows: T[]; count: number };
  pageable: Pageable;
}

class Page<T> {
  @ApiProperty({
    required: false,
    type: 'array',
    items: {
      type: 'object',
    },
  })
  content: T[];

  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  size: number;

  @ApiProperty({ required: false })
  totalPages: number;

  @ApiProperty({ required: false })
  total: number;

  constructor({ result, pageable }: IPageableParams<T>) {
    const { rows, count } = result;
    this.content = rows;
    this.page = pageable.page ?? 1;
    this.size = pageable.size ?? count;
    this.totalPages = pageable.size ? Math.ceil(count / pageable.size) || 1 : 1;
    this.total = count;
  }
}

export default Page;
