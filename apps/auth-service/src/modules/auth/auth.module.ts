import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CategoryModule } from '../category/category.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { WalletModule } from '../wallet/wallet.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getJwtConfig(),
    }),
    UserModule,
    WalletModule,
    CategoryModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
