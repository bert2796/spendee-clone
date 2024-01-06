import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly currencyId!: number;

  @IsNotEmpty()
  @IsString()
  readonly name!: string;
}
