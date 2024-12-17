import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class FilmDto extends ResourceDto {
  @ApiProperty({ example: 'A New Hope' })
  title: string;

  @ApiProperty({ example: 4 })
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war...' })
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas' })
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  release_date: string;

  @ApiProperty({ example: ['http://localhost/api/people/1/'] })
  characters: string[];

  @ApiProperty({ example: ['http://localhost/api/planets/1/'] })
  planets: string[];

  @ApiProperty({ example: ['http://localhost/api/starships/2/'] })
  starships: string[];

  @ApiProperty({ example: ['http://localhost/api/vehicles/4/'] })
  vehicles: string[];

  @ApiProperty({ example: ['http://localhost/api/species/1/'] })
  species: string[];

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/films/1/' })
  url: string;
}
