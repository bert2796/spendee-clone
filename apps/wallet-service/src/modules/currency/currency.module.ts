import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CurrencyEntity } from "./currency.entity";
import { CurrencyService } from "./currency.service";

@Module({
  exports: [CurrencyService],
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService]
})
export class CurrencyModule {}
