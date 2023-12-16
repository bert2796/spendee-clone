import { IsNotEmpty, IsNumber } from 'class-validator';

export class InitializeUserCategoriesDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;
}
