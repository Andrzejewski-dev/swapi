import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class WordDto extends ResourceDto {
  @ApiProperty({ example: 'word' })
  word: string;

  @ApiProperty({ example: 30 })
  occurrences: number;

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/words/4' })
  url: string;
}
