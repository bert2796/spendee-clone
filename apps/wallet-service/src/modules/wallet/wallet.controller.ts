import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import { WalletService } from "./wallet.service";

@Controller()
export class WalletController {
  constructor(
    private readonly walletService: WalletService
  ) {}

  @EventPattern('user-created')
  async initializeWallet(data: { userId: number }) {
    return this.walletService.initializeUserWallet(data.userId);
  }

  @MessagePattern({ cmd: 'get-user-wallets', role: 'wallet' })
  async getWallets(data: { userId: number }) {
    return this.walletService.find({ userId: data.userId });
  }
}
