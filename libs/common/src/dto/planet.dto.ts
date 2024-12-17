import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class PlanetDto extends ResourceDto {
  @ApiProperty({ example: 'Tatooine' })
  name: string;

  @ApiProperty({ example: '10465' })
  diameter: string;

  @ApiProperty({ example: '23' })
  rotation_period: string;

  @ApiProperty({ example: '304' })
  orbital_period: string;

  @ApiProperty({ example: '1 standard' })
  gravity: string;

  @ApiProperty({ example: '200000' })
  population: string;

  @ApiProperty({ example: 'arid' })
  climate: string;

  @ApiProperty({ example: 'desert' })
  terrain: string;

  @ApiProperty({ example: '1' })
  surface_water: string;

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/planets/1' })
  url: string;
}
