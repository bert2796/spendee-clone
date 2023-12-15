import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ConfigModule } from "./config/config.module";
import { TransactionModule } from "./transaction/transaction.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    ConfigModule,
    TransactionModule,
    WalletModule
  ],
})
export class AppModule {}
