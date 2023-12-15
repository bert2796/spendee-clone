import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class TransactionController {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly transactionServiceClient: ClientProxy
  ) {}

  @Get('/transactions/health')
  healthCheck() {
    return this.transactionServiceClient.send({ cmd: 'health' }, '');
  }
}
