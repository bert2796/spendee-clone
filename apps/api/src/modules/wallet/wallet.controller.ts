import { Controller, Get,  HttpCode, HttpStatus, Inject, Req } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { SkipThrottle } from "@nestjs/throttler";
import { User } from "@spendee-clone/common/types";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

import { Authorize } from "../../decorators/authorize.decorator";

@SkipThrottle()
@Controller('wallets')
export class WalletController {
  constructor(
    @Inject('WALLET_SERVICE') private readonly walletServiceClient: ClientProxy
  ) {}

  @Get('/health')
  healthCheck() {
    return this.walletServiceClient.send({ cmd: 'health' }, '');
  }

  @Get('/')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async getUserWallets(@Req() req: { user: User }) {
    return firstValueFrom(
      this.walletServiceClient
        .send({ cmd: 'get-user-wallets', role: 'wallet' }, { userId: req.user.id })
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error))))
    );
  }
}
