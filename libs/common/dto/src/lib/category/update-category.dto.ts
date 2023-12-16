import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name!: string;
}
