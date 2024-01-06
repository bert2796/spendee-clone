import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SendNewEntryDto } from '@spendee-clone/common/dto';

import { MailerService } from './mailer.service';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('transaction-created')
  async sendNewEntryEmail(sendNewEntryDto: SendNewEntryDto) {
    return this.mailerService.sendNewEntryEmail(sendNewEntryDto);
  }
}
