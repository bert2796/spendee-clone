import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthModule } from "./auth/auth.module";
import { CategoryModule } from "./category/category.module";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { HealthModule } from "./health/health.module";
import { UserModule } from "./user/user.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.getTypeOrmConfig(),
    }),

    AuthModule,
    ConfigModule,
    HealthModule,
    UserModule,
    CategoryModule,
    WalletModule
  ],
})
export class AppModule {}
