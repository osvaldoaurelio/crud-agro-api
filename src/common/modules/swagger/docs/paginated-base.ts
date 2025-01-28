import { ApiProperty } from '@nestjs/swagger';

export class PaginatedBase {
  @ApiProperty({ description: 'Current page number.', example: 1 })
  currentPage: number;

  @ApiProperty({ description: 'Total number of pages.', example: 5 })
  totalPages: number;

  @ApiProperty({ description: 'Total number of items.', example: 100 })
  totalItems: number;

  @ApiProperty({
    description: 'Next page number, or null if there is no next page.',
    example: 2,
  })
  nextPage: number | null;
}
