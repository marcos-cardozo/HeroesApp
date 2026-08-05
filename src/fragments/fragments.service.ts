import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { FragmentTransaction, FragmentReason } from './entities/fragment-transaction.entity';

export interface BalanceResponse {
  balance: number;
  totalEarned: number;
}

export interface TransactionWithBoss {
  id: string;
  amount: number;
  reason: FragmentReason;
  relatedBossId: string | null;
  description: string | null;
  createdAt: Date;
}

export interface TransactionHistoryResponse {
  transactions: TransactionWithBoss[];
  total: number;
}

@Injectable()
export class FragmentsService {
  constructor(
    @InjectRepository(FragmentTransaction)
    private transactionRepository: Repository<FragmentTransaction>,
    private dataSource: DataSource,
  ) {}

  async getBalance(userId: string): Promise<BalanceResponse> {
    const transactions = await this.transactionRepository.find({
      where: { userId },
    });

    let balance = 0;
    let totalEarned = 0;

    for (const tx of transactions) {
      balance += tx.amount;
      if (tx.amount > 0) {
        totalEarned += tx.amount;
      }
    }

    return { balance, totalEarned };
  }

  async getTransactions(
    userId: string,
    limit: number = 20,
    offset: number = 0,
  ): Promise<TransactionHistoryResponse> {
    const [transactions, totalCount] = await this.transactionRepository.findAndCount({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });

    const result: TransactionWithBoss[] = transactions.map((tx) => ({
      id: tx.id,
      amount: tx.amount,
      reason: tx.reason,
      relatedBossId: tx.relatedBossId || null,
      description: tx.description,
      createdAt: tx.createdAt,
    }));

    return { transactions: result, total: totalCount };
  }

  async spend(
    userId: string,
    amount: number,
    description?: string,
  ): Promise<FragmentTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const balance = await this.calculateBalanceWithQueryRunner(queryRunner, userId);

      if (balance < amount) {
        throw new BadRequestException('Fragmentos insuficientes');
      }

      const transaction = queryRunner.manager.create(FragmentTransaction, {
        userId,
        amount: -amount,
        reason: FragmentReason.REDEMPTION,
        description: description || null,
      });

      const saved = await queryRunner.manager.save(transaction);
      await queryRunner.commitTransaction();
      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async awardFragmentsTransactional(
    queryRunner: import('typeorm').QueryRunner,
    userId: string,
    bossId: string,
    amount: number,
  ): Promise<FragmentTransaction> {
    const transaction = queryRunner.manager.create(FragmentTransaction, {
      userId,
      amount,
      reason: FragmentReason.BOSS_DEFEATED,
      relatedBossId: bossId,
      description: null,
    });

    return queryRunner.manager.save(transaction);
  }

  private async calculateBalanceWithQueryRunner(
    queryRunner: import('typeorm').QueryRunner,
    userId: string,
  ): Promise<number> {
    const result = await queryRunner.manager
      .getRepository(FragmentTransaction)
      .createQueryBuilder('tx')
      .select('COALESCE(SUM(tx.amount), 0)', 'balance')
      .where('tx.userId = :userId', { userId })
      .getRawOne();

    return parseInt(result?.balance || '0', 10);
  }
}
