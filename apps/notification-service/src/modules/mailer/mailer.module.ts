import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailerService } from './mailer.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  exports: [MailerService],
  imports: [
    ConfigModule,
    NestMailerModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          return {
            defaults: {
              from: '"No Reply" <noreply@example.com>',
            },
            template: {
              adapter: new HandlebarsAdapter(),
              dir: join(__dirname, 'assets/templates'),
              options: {
                strict: true,
              },
            },
            transport: configService.getMailerConfig(),
          };
        },
      }
    ),
  ],
  providers: [MailerService],
})
export class MailerModule {}
