import { Injectable } from "@nestjs/common";
import { MailerService as NestMailerService } from '@nestjs-modules/mailer';
import { SendNewEntryDto }  from '@spendee-clone/common/dto';

@Injectable()
export class MailerService {
  constructor(private readonly nestMailerService: NestMailerService) {}

  async sendNewEntryEmail(sendNewEntryDto: SendNewEntryDto): Promise<void>
  {
    await this.nestMailerService.sendMail({
      context: {
        amount: sendNewEntryDto.amount,
        category: sendNewEntryDto.category,
        date: sendNewEntryDto.date,
        note: sendNewEntryDto.note,
      },
      subject: 'New Transaction Entry',
      template: './new-entry',
      to: sendNewEntryDto.email
    });
  }
}
