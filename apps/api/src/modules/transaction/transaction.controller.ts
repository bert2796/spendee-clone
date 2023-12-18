import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query, Req } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { SkipThrottle } from "@nestjs/throttler";
import { APICreateTransactionDto, APIGetUserTransactionsDto, CreateTransactionDto, GetUserTransactionsDto } from "@spendee-clone/common/dto";
import { Transaction, User } from "@spendee-clone/common/types";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";

import { Authorize } from "../../decorators/authorize.decorator";

@SkipThrottle()
@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject('TRANSACTION_SERVICE') private readonly transactionServiceClient: ClientProxy
  ) {}

  @Get('/transactions/health')
  healthCheck() {
    return this.transactionServiceClient.send({ cmd: 'health' }, '');
  }

  @Get('/')
  @Authorize()
  @HttpCode(HttpStatus.OK)
  async getUserTransactions(@Req() req: { user: User }, @Query() getUserTransactionsDto: APIGetUserTransactionsDto) {
    return firstValueFrom(
      this.transactionServiceClient
        .send<Transaction[], GetUserTransactionsDto>({ cmd: 'get-user-transactions', role: 'transaction' }, { ...getUserTransactionsDto, userId: req.user.id })
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error))))
    );
  }

  @Post('/')
  @Authorize()
  @HttpCode(HttpStatus.CREATED)
  async createCategory(@Req() req: { user: User }, @Body() createTransactionDto: APICreateTransactionDto) {
    return firstValueFrom(
      this.transactionServiceClient
        .send<Transaction, CreateTransactionDto>({ cmd: 'create-transaction', role: 'transaction' }, { ...createTransactionDto, userId: req.user.id, userEmail: req.user.email })
        .pipe(timeout(5000))
        .pipe(catchError((error) => throwError(() => new RpcException(error))))
    );
  }
}
