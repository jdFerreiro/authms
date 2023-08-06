import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MenuRoleDto {
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'menu id is required.' })
  readonly menuId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'role id is required.' })
  readonly roleId: number;

  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
