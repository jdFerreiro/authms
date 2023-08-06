import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';

enum menuStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class MenuDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'id is required.' })
  readonly id: number;

  @ApiProperty()
  readonly parentId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'name is required.' })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'path is required.' })
  readonly menuPath: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'status is required.' })
  @IsEnum(menuStatus, {
    message: 'status must be either active or inactive',
  })
  readonly status: string;
  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
