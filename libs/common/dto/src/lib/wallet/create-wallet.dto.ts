import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly currencyId!: number;
}
