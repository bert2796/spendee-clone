import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SendNewEntryDto } from "@spendee-clone/common/dto";

@Controller()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATION_SERVICE') private readonly notificationServiceClient: ClientProxy
  ) {}

  async sendEmail(sendNewEntryDto: SendNewEntryDto) {
    return this.notificationServiceClient.emit('transaction-created', sendNewEntryDto);
  }
}
