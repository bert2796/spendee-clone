import { Controller, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller()
export class WalletService {
  constructor(
    @Inject('WALLET_SERVICE') private readonly walletServiceClient: ClientProxy
  ) {}

  async initializeWallet(userId: number) {
    return this.walletServiceClient.emit('user-created', { userId });
  }
}
