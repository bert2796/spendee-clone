import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('IDX_TRANSACTION', ['userId', 'walletId', 'date', 'type'])
@Entity({ name: 'transactions' })
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'int' })
  userId: number;

  @Index()
  @Column({ type: 'int' })
  walletId: number;

  @Column({ type: 'int' })
  categoryId: number;

  @Column({ type: 'bigint' })
  amount: string;

  @Index()
  @Column({ enum: ['expense', 'income'], type: 'enum' })
  type: 'expense' | 'income';

  // https://github.com/typeorm/typeorm/issues/2176
  @Index()
  @Column({ type: 'date' })
  date: string;

  @Column({ length: 255, nullable: true, type: 'varchar' })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
