import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CreateTransactionDto, GenericFilter, GetUserTransactionsDto } from "@spendee-clone/common/dto";

import { TransactionService } from "./transaction.service";

@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService
  ) {}

  @MessagePattern({ cmd: 'create-transaction', role: 'transaction' })
  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @MessagePattern({ cmd: 'get-user-transactions', role: 'transaction' })
  async getUserTransactions(getUserTransactionsDto: GetUserTransactionsDto) {
    const where = {
      userId: getUserTransactionsDto.userId,
      ...(getUserTransactionsDto?.walletId && { walletId: getUserTransactionsDto.walletId }),
      ...(getUserTransactionsDto?.categoryId && { categoryId: getUserTransactionsDto.categoryId }),
      ...(getUserTransactionsDto?.type && { type: getUserTransactionsDto.type })
    };

    const filter: GenericFilter = {
      ...(getUserTransactionsDto?.page && { skip: getUserTransactionsDto.page }),
      ...(getUserTransactionsDto?.pageSize && { take: getUserTransactionsDto.pageSize }),
      ...(getUserTransactionsDto?.orderBy && {orderBy: getUserTransactionsDto.orderBy }),
      ...(getUserTransactionsDto?.sortOrder && {sortOrder: getUserTransactionsDto.sortOrder })
    }

    if (filter?.page && filter?.pageSize) {
      return this.transactionService.findPaginated(where, filter);
    }

    return this.transactionService.find(where);
  }
}
