import { IsNotEmpty, IsString } from 'class-validator';

import { Match } from '../../decorators/match.decorator';
import { CreateUserDto } from "../user/create-user.dto";

export class RegisterAuthDto extends CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Match(RegisterAuthDto, (o) => o.password, 'password')
  readonly passwordConfirm!: string;
}
