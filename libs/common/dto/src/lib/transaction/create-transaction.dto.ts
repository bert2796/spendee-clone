import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly walletId!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly categoryId!: number;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  readonly amount!: string;

  @IsNotEmpty()
  @IsDateString()
  readonly date!: string;

  @IsString()
  readonly note!: string;

}
