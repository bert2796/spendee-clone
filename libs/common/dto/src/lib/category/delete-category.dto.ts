import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id!: number;

  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;
}
