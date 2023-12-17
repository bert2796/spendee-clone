import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CategoryModule } from "./category/category.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { HealthModule } from "./health/health.module";
import { TransactionModule } from "./transaction/transaction.module";
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
    CategoryModule,
    WalletModule,
    TransactionModule,
  ],
})
export class AppModule {}
