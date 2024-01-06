import { CategoryTypes } from '@spendee-clone/common/types';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

import { GenericFilter } from '../generic-filter.dto';

export class APIGetUserTransactionsDto extends GenericFilter {
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
