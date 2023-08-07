import { User } from '@Entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MinLength, IsIP } from 'class-validator';
import { ForeignKey, HasMany } from 'sequelize-typescript';

enum eAction {
  SELECT = 'select',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

export class AuditDto {
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'user id is required.' })
  readonly userId: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'action is required.' })
  @IsEnum(eAction, {
    message: 'gender must be either male or female',
  })
  readonly action: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'description is required.' })
  @MinLength(5, {
    message: 'description must be 15 characters long at lease.',
  })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ip address is required.' })
  @IsIP('4', { message: 'invalid ip address.' })
  readonly ipAddress: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'payload is required.' })
  readonly payload: string;

  readonly createdAt: Date;
  @ForeignKey(() => User)
  createdBy: number;

  readonly updatedAt: Date;
  updatedBy: number;

  @HasMany(() => User)
  users: User[];
}
