import { CategoryTypes } from '@spendee-clone/common/types';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class APICreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly name!: string;

  @IsNotEmpty()
  @IsEnum(CategoryTypes)
  readonly type!: CategoryTypes;
}
