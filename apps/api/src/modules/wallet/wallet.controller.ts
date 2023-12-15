import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class WalletController {
  constructor(
    @Inject('WALLET_SERVICE') private readonly walletServiceClient: ClientProxy
  ) {}

  @Get('/wallets/health')
  healthCheck() {
    return this.walletServiceClient.send({ cmd: 'health' }, '');
  }
}
