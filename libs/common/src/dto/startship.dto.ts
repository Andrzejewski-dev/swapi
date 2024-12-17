import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class StarshipDto extends ResourceDto {
  @ApiProperty({ example: 'Death Star' })
  name: string;

  @ApiProperty({ example: 'DS-1 Orbital Battle Station' })
  model: string;

  @ApiProperty({ example: 'Deep Space Mobile Battlestation' })
  starship_class: string;

  @ApiProperty({
    example: 'Imperial Department of Military Research, Sienar Fleet Systems',
  })
  manufacturer: string;

  @ApiProperty({ example: '1000000000000' })
  cost_in_credits: string;

  @ApiProperty({ example: '120000' })
  length: string;

  @ApiProperty({ example: '342,953' })
  crew: string;

  @ApiProperty({ example: '843,342' })
  passengers: string;

  @ApiProperty({ example: 'n/a' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '4.0' })
  hyperdrive_rating: string;

  @ApiProperty({ example: '10' })
  MGLT: string;

  @ApiProperty({ example: '1000000000000' })
  cargo_capacity: string;

  @ApiProperty({ example: '3 years' })
  consumables: string;

  @ApiProperty({ example: [] })
  pilots: string[];

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/starships/9' })
  url: string;
}
