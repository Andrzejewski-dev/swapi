import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class PersonDto extends ResourceDto {
  @ApiProperty({ example: 'Luke Skywalker' })
  name: string;

  @ApiProperty({ example: '172' })
  height: string;

  @ApiProperty({ example: '77' })
  mass: string;

  @ApiProperty({ example: 'blond' })
  hair_color: string;

  @ApiProperty({ example: 'fair' })
  skin_color: string;

  @ApiProperty({ example: 'blue' })
  eye_color: string;

  @ApiProperty({ example: '19BBY' })
  birth_year: string;

  @ApiProperty({ example: 'male' })
  gender: string;

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/planets/1' })
  homeworld: string;

  @ApiProperty({ example: 'http://localhost/api/people/1' })
  url: string;
}
