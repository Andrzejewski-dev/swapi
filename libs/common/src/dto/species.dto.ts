import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class SpeciesDto extends ResourceDto {
  @ApiProperty({ example: 'Human' })
  name: string;

  @ApiProperty({ example: 'mammal' })
  classification: string;

  @ApiProperty({ example: 'sentient' })
  designation: string;

  @ApiProperty({ example: '180' })
  average_height: string;

  @ApiProperty({ example: '120' })
  average_lifespan: string;

  @ApiProperty({ example: 'blonde, brown, black, red' })
  hair_colors: string;

  @ApiProperty({ example: 'caucasian, black, asian, hispanic' })
  skin_colors: string;

  @ApiProperty({ example: 'brown, blue, green, hazel, grey, amber' })
  eye_colors: string;

  @ApiProperty({ example: 'http://localhost/api/planets/1' })
  homeworld: string | null;

  @ApiProperty({ example: 'Galactic Basic' })
  language: string;

  @ApiProperty({
    example: [
      'http://localhost/api/people/66',
      'http://localhost/api/people/67',
    ],
  })
  people: string[];

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/species/1' })
  url: string;
}
