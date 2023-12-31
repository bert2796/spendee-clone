import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from '../category/category.module';
import { NotificationModule } from '../notification/notification.module';
import { WalletModule } from '../wallet/wallet.module';
import { TransactionController } from './transaction.controller';
import { TransactionEntity } from './transaction.entity';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    CategoryModule,
    NotificationModule,
    WalletModule,
  ],
  providers: [TransactionService],
})
export class TransactionModule {}
