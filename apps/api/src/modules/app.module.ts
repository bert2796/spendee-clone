import { Module } from "@nestjs/common";
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthorizeGuard } from '../guards/authorize.guard';
import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ConfigModule } from "./config/config.module";
import { TransactionModule } from "./transaction/transaction.module";
import { UserModule } from "./user/user.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 3,
          name: 'short',
          ttl: 1000,
        },
        {
          limit: 20,
          name: 'medium',
          ttl: 10000
        },
        {
          limit: 100,
          name: 'long',
          ttl: 60000
        }
      ]
    }),

    AuthModule,
    CategoryModule,
    ConfigModule,
    TransactionModule,
    WalletModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizeGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
