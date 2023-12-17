import { IsNotEmpty, IsNumber } from 'class-validator';

import { InitializeUserWalletDto } from './initialize-user-wallet.dto';

export class GetUserWalletDto extends InitializeUserWalletDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id!: number;
}
