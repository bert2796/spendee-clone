import { CategoryTypes } from '@spendee-clone/common/types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class SendNewEntryDto {
  @IsNotEmpty()
  @IsString()
  readonly email!: string;

  @IsNotEmpty()
  @IsString()
  readonly amount!: string;

  @IsNotEmpty()
  @IsString()
  readonly note!: string;

  @IsNotEmpty()
  @IsEnum(CategoryTypes)
  readonly type!: CategoryTypes;

  @IsNotEmpty()
  @IsString()
  readonly category!: string;

  @IsNotEmpty()
  @IsString()
  readonly date!: string;
}
