import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { GetUserWalletDto } from "@spendee-clone/common/dto";
import { Wallet } from "@spendee-clone/common/types";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

@Controller()
export class WalletService {
  constructor(
    @Inject('WALLET_SERVICE') private readonly walletServiceClient: ClientProxy
  ) {}

  async getUserWallet(getUserWalletDto: GetUserWalletDto) {
    return firstValueFrom(this.walletServiceClient
        .send<Wallet, GetUserWalletDto>({ cmd: 'get-user-wallet', role: 'wallet' }, getUserWalletDto)
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error)))));
  }
}
