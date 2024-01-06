import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { NotificationService } from './notification.service';

@Module({
  exports: [NotificationService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'NOTIFICATION_SERVICE',
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('NOTIFICATION_SERVICE_HOST'),
            port: configService.get<number>('NOTIFICATION_SERVICE_PORT'),
          },
          transport: Transport.TCP,
        }),
      },
    ]),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
