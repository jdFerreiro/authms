import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, MinLength, IsDate, IsIP } from 'class-validator';
import { IsIPv4 } from 'sequelize-typescript';

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
  @MinLength(15, {
    message: 'description must be 15 characters long at lease.',
  })
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'created date is required.' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'created date is not a valid date.' })
  readonly createdDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'ip address is required.' })
  @IsIP('4', { message: 'ip address must be ip v4.' })
  readonly ipAddress: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'payload is required.' })
  readonly payload: string;

  readonly createdAt: Date;
  createdBy: number;
  readonly updatedAt: Date;
  updatedBy: number;
}
