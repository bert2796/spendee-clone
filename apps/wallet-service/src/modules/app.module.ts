import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { CurrencyModule } from "./currency/currency.module";
import { HealthModule } from "./health/health.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),

    ConfigModule,
    HealthModule,
    CurrencyModule,
    WalletModule
  ],
})
export class AppModule {}
