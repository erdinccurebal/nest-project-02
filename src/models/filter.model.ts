import { ApiProperty } from '@nestjs/swagger';

export class FilterModel {
  @ApiProperty({ required: false })
  page: number;

  @ApiProperty({ required: false })
  size: number;

  @ApiProperty({ required: false })
  sort: string;

  @ApiProperty({ required: false })
  sortBy: string;

  @ApiProperty({ required: false })
  searchBy: string;

  @ApiProperty({ required: false })
  queryText: string;
}
