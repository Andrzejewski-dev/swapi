import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class PaginatedDto<T extends ResourceDto> {
  @ApiProperty({ description: 'Total count of resources', example: 100 })
  count: number;

  @ApiProperty({
    description: 'URL to the next page of results',
    type: String,
    nullable: true,
    example: 'http://localhost/api/resources?page=2',
  })
  next: string | null;

  @ApiProperty({
    description: 'URL to the previous page of results',
    type: String,
    nullable: true,
    example: 'http://localhost/api/resources?page=1',
  })
  previous: string | null;

  @ApiProperty({
    description: 'List of results for the current page',
    type: [ResourceDto],
  })
  results: T[];
}
