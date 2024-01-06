import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto, GenericFilter } from '@spendee-clone/common/dto';
import { convertToBigInt } from '@spendee-clone/common/utils';
import { FindOptionsWhere, Repository } from 'typeorm';

import { CategoryService } from '../category/category.service';
import { NotificationService } from '../notification/notification.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService,
    private readonly walletService: WalletService,
  ) {}

  async find(
    where:
      | FindOptionsWhere<TransactionEntity>
      | FindOptionsWhere<TransactionEntity>[],
  ) {
    return this.transactionRepository.find({
      order: { createdAt: 'DESC' },
      where,
    });
  }

  async findPaginated(
    where:
      | FindOptionsWhere<TransactionEntity>
      | FindOptionsWhere<TransactionEntity>[],
    filter?: GenericFilter,
  ) {
    return this.transactionRepository.findAndCount({
      order: {
        ...(filter?.orderBy && { [filter.orderBy]: filter.sortOrder }),
        ...(!filter?.orderBy && { createdAt: 'DESC' }),
      },
      ...(filter?.page && { skip: (filter.page - 1) * (filter.pageSize + 1) }),
      ...(filter?.pageSize && { take: filter.pageSize }),
      where,
    });
  }

  async create(createTransactionDto: CreateTransactionDto) {
    const existingTransaction = await this.transactionRepository.findOne({
      where: {
        amount: `${convertToBigInt(createTransactionDto.amount)}`,
        categoryId: createTransactionDto.categoryId,
        date: createTransactionDto.date,
        note: createTransactionDto.note,
        walletId: createTransactionDto.walletId,
      },
    });
    if (!createTransactionDto.isConfirmed && existingTransaction) {
      throw new RpcException({
        code: HttpStatus.BAD_REQUEST,
        message: 'Transaction already exists.',
      });
    }

    const wallet = await this.walletService.getUserWallet({
      id: createTransactionDto.walletId,
      userId: createTransactionDto.userId,
    });

    const category = await this.categoryService.getUserCategory({
      id: createTransactionDto.categoryId,
      userId: createTransactionDto.userId,
    });

    const transaction = new TransactionEntity();
    transaction.userId = createTransactionDto.userId;
    transaction.walletId = wallet.id;
    transaction.categoryId = category.id;
    transaction.amount = `${convertToBigInt(createTransactionDto.amount)}`;
    transaction.type = category.type;
    transaction.date = createTransactionDto.date;
    transaction.note = createTransactionDto.note;

    const savedTransaction = this.transactionRepository.save(transaction);

    this.notificationService.sendEmail({
      amount: createTransactionDto.amount,
      category: category.name,
      date: createTransactionDto.date,
      email: createTransactionDto.userEmail,
      note: createTransactionDto.note,
      type: category.type,
    });

    return savedTransaction;
  }
}
