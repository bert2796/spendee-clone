import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, Validate } from 'class-validator';

import { PasswordValidation } from '../../validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  readonly name!: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(128)
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Validate(PasswordValidation)
  readonly password!: string;
}
