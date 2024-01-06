import { IsBoolean, IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class APICreateTransactionDto {
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

  @IsBoolean()
  @IsOptional()
  readonly isConfirmed?: boolean;
}
