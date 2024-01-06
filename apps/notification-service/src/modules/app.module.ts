import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [ConfigModule, HealthModule, MailerModule],
})
export class AppModule {}
