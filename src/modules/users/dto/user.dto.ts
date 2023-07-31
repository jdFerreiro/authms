import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  IsDate,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

/*
function maxDateCalc() {
  const newDate = new Date();
  const months = 18 * 12;
  newDate.setMonth(newDate.getMonth() - months);

  return newDate;
}
*/

export class UserDto {
  @IsNotEmpty({ message: 'name is required.' })
  readonly name: string;

  @IsNotEmpty({ message: 'email is required.' })
  @IsEmail({}, { message: 'invalid email.' })
  readonly email: string;

  @IsNotEmpty({ message: 'password is required.' })
  @MinLength(8, { message: 'password must be 8 characters long at lease.' })
  readonly password: string;

  @IsNotEmpty({ message: 'gender is required.' })
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  readonly gender: string;

  @IsNotEmpty({ message: 'status id is required.' })
  readonly statusId: number;

  @IsNotEmpty({ message: 'status date is required.' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'status date is not a valid date.' })
  readonly statusDate: Date;

  @IsNotEmpty({ message: 'born date is required.' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'born date is not a valid date.' })
  // @MaxDate(maxDateCalc())
  readonly bornDate: Date;

  readonly createdAt: Date;
  readonly createdBy: number;
  readonly updatedAt: Date;
  readonly updatedBy: number;
}
