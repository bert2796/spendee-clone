import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransactionDto, GenericFilter } from "@spendee-clone/common/dto";
import { convertToBigInt } from "@spendee-clone/common/utils";
import { FindOptionsWhere, Repository } from "typeorm";

import { CategoryService } from "../category/category.service";
import { WalletService } from "../wallet/wallet.service";
import { TransactionEntity } from "./transaction.entity";
import { NotificationService } from "../notification/notification.service";

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly categoryService: CategoryService,
    private readonly notificationService: NotificationService,
    private readonly walletService: WalletService
  ) {}

  async find(where: FindOptionsWhere<TransactionEntity> | FindOptionsWhere<TransactionEntity>[]) {
    return this.transactionRepository.find({
      order: { createdAt: 'DESC' },
      where,
    });
  }

  async findPaginated(where: FindOptionsWhere<TransactionEntity> | FindOptionsWhere<TransactionEntity>[], filter?: GenericFilter) {
    return this.transactionRepository.findAndCount({
      order: {
        ...(filter?.orderBy && { [filter.orderBy]: filter.sortOrder }),
        ...(!filter?.orderBy && { createdAt: 'DESC' })
      },
      ...(filter?.page && { skip: (filter.page - 1) * (filter.pageSize + 1) }),
      ...(filter?.pageSize && { take: filter.pageSize }),
      where,
    });
  }


  async create(createTransactionDto: CreateTransactionDto) {

    const wallet = await this.walletService.getUserWallet({
      id: createTransactionDto.walletId,
      userId: createTransactionDto.userId
    });

    const category = await this.categoryService.getUserCategory({
      id: createTransactionDto.categoryId,
      userId: createTransactionDto.userId
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
      email: createTransactionDto.userEmail,
      amount: createTransactionDto.amount,
      note: createTransactionDto.note,
      category: category.name,
      type: category.type,
      date: createTransactionDto.date,
    });

    return savedTransaction;
  }

}
