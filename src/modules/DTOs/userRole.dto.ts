import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserRoleDto {
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'user id is required.' })
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'role id is required.' })
  readonly roleId: number;

  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
