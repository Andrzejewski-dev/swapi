import { ApiProperty } from '@nestjs/swagger';

export abstract class ResourceDto {
  @ApiProperty({ example: 4 })
  id: number;
}
