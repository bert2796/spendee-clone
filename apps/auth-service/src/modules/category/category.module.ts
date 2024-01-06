import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CategoryService } from './category.service';

@Module({
  exports: [CategoryService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'CATEGORY_SERVICE',
        useFactory: (configService: ConfigService) => ({
          options: {
            host: configService.get<string>('CATEGORY_SERVICE_HOST'),
            port: configService.get<number>('CATEGORY_SERVICE_PORT'),
          },
          transport: Transport.TCP,
        }),
      },
    ]),
  ],
  providers: [CategoryService],
})
export class CategoryModule {}
