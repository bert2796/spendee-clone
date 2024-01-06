import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { WalletController } from './wallet.controller';

@Module({
  controllers: [WalletController],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'WALLET_SERVICE',
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('WALLET_SERVICE_HOST'),
            port: configService.get<number>('WALLET_SERVICE_PORT'),
          },
          transport: Transport.TCP,
        }),
      },
    ]),
  ],
})
export class WalletModule {}
