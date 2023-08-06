import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

enum menuStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class MenuDto {
  @ApiProperty()
  readonly parentId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'name is required.' })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'path is required.' })
  readonly path: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'status is required.' })
  @IsEnum(menuStatus, {
    message: 'status must be either active or inactive',
  })
  readonly gender: string;
  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
