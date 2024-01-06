import { CategoryTypes } from '@spendee-clone/common/types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name!: string;

  @IsNotEmpty()
  @IsEnum(CategoryTypes)
  readonly type!: CategoryTypes;
}
