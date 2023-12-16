import { IsNotEmpty, IsNumber } from 'class-validator';

export class InitializeUserWalletDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;
}
