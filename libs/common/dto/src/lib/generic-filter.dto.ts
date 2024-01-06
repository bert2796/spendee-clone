import { SortOrders } from '@spendee-clone/common/types';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GenericFilter {
  @IsOptional()
  @IsNumber()
  readonly page?: number;

  @IsOptional()
  @IsNumber()
  readonly pageSize?: number;

  @IsOptional()
  readonly orderBy?: string;

  @IsEnum(SortOrders)
  @IsOptional()
  readonly sortOrder?: SortOrders;
}
