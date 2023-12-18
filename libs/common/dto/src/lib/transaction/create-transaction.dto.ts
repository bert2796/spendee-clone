import { IsBoolean, IsDateString, IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsEmail()
  readonly userEmail!: string;

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
  @IsOptional()
  readonly note?: string;

  @IsBoolean()
  @IsOptional()
  readonly isConfirmed?: boolean;
}
