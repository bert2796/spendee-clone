import { IsNotEmpty, IsNumber } from 'class-validator';

import { InitializeUserCategoriesDto } from './initialize-user-categories.dto';

export class GetUserCategoryDto extends InitializeUserCategoriesDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id!: number;
}
