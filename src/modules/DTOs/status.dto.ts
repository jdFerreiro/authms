import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StatusDto {
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'name is required.' })
  readonly name: string;

  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
