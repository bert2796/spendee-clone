import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { TransactionController } from './transaction.controller';

@Module({
  controllers: [TransactionController],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'TRANSACTION_SERVICE',
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('TRANSACTION_SERVICE_HOST'),
            port: configService.get<number>('TRANSACTION_SERVICE_PORT'),
          },
          transport: Transport.TCP,
        }),
      },
    ]),
  ],
})
export class TransactionModule {}
