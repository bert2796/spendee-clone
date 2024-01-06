import { CategoryTypes } from '@spendee-clone/common/types';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

import { GenericFilter } from '../generic-filter.dto';

export class GetUserTransactionsDto extends GenericFilter {
  @IsNotEmpty()
  @IsNumber()
  readonly userId!: number;

  @IsOptional()
  @IsNumberString()
  readonly walletId!: number;

  @IsOptional()
  @IsNumberString()
  readonly categoryId?: number;

  @IsOptional()
  @IsEnum(CategoryTypes)
  readonly type?: CategoryTypes;
}
