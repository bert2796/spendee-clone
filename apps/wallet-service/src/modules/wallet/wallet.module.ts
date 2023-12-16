import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CurrencyModule } from "../currency/currency.module";
import { WalletController } from "./wallet.controller";
import { WalletEntity } from "./wallet.entity";
import { WalletService } from "./wallet.service";

@Module({
  controllers: [WalletController],
  imports: [TypeOrmModule.forFeature([WalletEntity]), CurrencyModule],
  providers: [WalletService]
})
export class WalletModule {}
