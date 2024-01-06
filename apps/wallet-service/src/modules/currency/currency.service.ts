import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CurrencyEntity } from './currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async findOne(
    where:
      | FindOptionsWhere<CurrencyEntity>
      | FindOptionsWhere<CurrencyEntity>[],
  ): Promise<CurrencyEntity> {
    return this.currencyRepository.findOne({
      where,
    });
  }
}
