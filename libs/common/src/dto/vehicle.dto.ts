import { ApiProperty } from '@nestjs/swagger';
import { ResourceDto } from './resource.dto';

export class VehicleDto extends ResourceDto {
  @ApiProperty({ example: 'Sand Crawler' })
  name: string;

  @ApiProperty({ example: 'Digger Crawler' })
  model: string;

  @ApiProperty({ example: 'wheeled' })
  vehicle_class: string;

  @ApiProperty({ example: 'Corellia Mining Corporation' })
  manufacturer: string;

  @ApiProperty({ example: '150000' })
  cost_in_credits: string;

  @ApiProperty({ example: '36.8' })
  length: string;

  @ApiProperty({ example: '46' })
  crew: string;

  @ApiProperty({ example: '30' })
  passengers: string;

  @ApiProperty({ example: '30' })
  max_atmosphering_speed: string;

  @ApiProperty({ example: '50000' })
  cargo_capacity: string;

  @ApiProperty({ example: '2 months' })
  consumables: string;

  @ApiProperty({ example: [] })
  films: string[];

  @ApiProperty({ example: [] })
  pilots: string[];

  @ApiProperty({ example: 1734429060213 })
  created_at: number;

  @ApiProperty({ example: 1734429060213 })
  updated_at: number;

  @ApiProperty({ example: 'http://localhost/api/vehicles/4' })
  url: string;
}
