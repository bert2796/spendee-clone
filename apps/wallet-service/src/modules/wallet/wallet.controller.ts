import { Controller } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import { GetUserWalletsDto, InitializeUserWalletDto } from "@spendee-clone/common/dto";

import { WalletService } from "./wallet.service";

@Controller()
export class WalletController {
  constructor(
    private readonly walletService: WalletService
  ) {}

  @EventPattern('user-created')
  async initializeUserWallet(initializedUserWalletDto: InitializeUserWalletDto) {
    return this.walletService.initializeUserWallet(initializedUserWalletDto);
  }

  @MessagePattern({ cmd: 'get-user-wallets', role: 'wallet' })
  async getUserWallets(getUserWalletsDto: GetUserWalletsDto) {
    const { userId } = getUserWalletsDto;
    return this.walletService.find({ userId });
  }
}
