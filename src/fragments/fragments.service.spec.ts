import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { FragmentsService } from './fragments.service';
import { FragmentTransaction, FragmentReason } from './entities/fragment-transaction.entity';

describe('FragmentsService', () => {
  let service: FragmentsService;

  const mockTransactionRepository = {
    find: jest.fn(),
    findAndCount: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockDataSource = {
    createQueryRunner: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FragmentsService,
        {
          provide: getRepositoryToken(FragmentTransaction),
          useValue: mockTransactionRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<FragmentsService>(FragmentsService);
    jest.clearAllMocks();
  });

  describe('getBalance', () => {
    it('should return balance 0 and totalEarned 0 when no transactions', async () => {
      mockTransactionRepository.find.mockResolvedValue([]);

      const result = await service.getBalance('user-1');

      expect(result.balance).toBe(0);
      expect(result.totalEarned).toBe(0);
    });

    it('should calculate balance correctly with multiple transactions', async () => {
      mockTransactionRepository.find.mockResolvedValue([
        { id: '1', amount: 10, reason: FragmentReason.BOSS_DEFEATED },
        { id: '2', amount: -3, reason: FragmentReason.REDEMPTION },
        { id: '3', amount: 10, reason: FragmentReason.BOSS_DEFEATED },
      ]);

      const result = await service.getBalance('user-1');

      expect(result.balance).toBe(17);
      expect(result.totalEarned).toBe(20);
    });

    it('should not count negative amounts in totalEarned', async () => {
      mockTransactionRepository.find.mockResolvedValue([
        { id: '1', amount: 10, reason: FragmentReason.BOSS_DEFEATED },
        { id: '2', amount: -5, reason: FragmentReason.REDEMPTION },
      ]);

      const result = await service.getBalance('user-1');

      expect(result.balance).toBe(5);
      expect(result.totalEarned).toBe(10);
    });
  });

  describe('getTransactions', () => {
    it('should return paginated transactions', async () => {
      const mockTxs = [
        { id: '1', amount: 10, reason: FragmentReason.BOSS_DEFEATED, relatedBossId: 'boss-1', description: null, createdAt: new Date() },
        { id: '2', amount: -3, reason: FragmentReason.REDEMPTION, relatedBossId: null, description: 'Test spend', createdAt: new Date() },
      ];
      mockTransactionRepository.findAndCount.mockResolvedValue([mockTxs, 2]);

      const result = await service.getTransactions('user-1', 20, 0);

      expect(result.transactions).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.transactions[0].amount).toBe(10);
      expect(result.transactions[0].reason).toBe(FragmentReason.BOSS_DEFEATED);
    });
  });

  describe('spend', () => {
    let mockQueryRunner: any;

    beforeEach(() => {
      mockQueryRunner = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
          getRepository: jest.fn().mockReturnValue({
            createQueryBuilder: jest.fn().mockReturnValue({
              select: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getRawOne: jest.fn(),
            }),
          }),
        },
      };
      mockDataSource.createQueryRunner.mockReturnValue(mockQueryRunner);
    });

    it('should throw BadRequestException when insufficient balance', async () => {
      mockQueryRunner.manager.getRepository().createQueryBuilder().getRawOne.mockResolvedValue({ balance: '5' });

      await expect(service.spend('user-1', 10)).rejects.toThrow(BadRequestException);
      await expect(service.spend('user-1', 10)).rejects.toThrow('Fragmentos insuficientes');
    });

    it('should create negative transaction when balance is sufficient', async () => {
      mockQueryRunner.manager.getRepository().createQueryBuilder().getRawOne.mockResolvedValue({ balance: '100' });
      mockQueryRunner.manager.create.mockReturnValue({ id: 'tx-1', amount: -10, reason: FragmentReason.REDEMPTION });
      mockQueryRunner.manager.save.mockResolvedValue({ id: 'tx-1', amount: -10, reason: FragmentReason.REDEMPTION });

      const result = await service.spend('user-1', 10, 'Test spend');

      expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ amount: -10, reason: FragmentReason.REDEMPTION, description: 'Test spend' }),
      );
      expect(mockQueryRunner.commitTransaction).toHaveBeenCalled();
      expect(result.amount).toBe(-10);
    });

    it('should rollback transaction on error', async () => {
      mockQueryRunner.manager.getRepository().createQueryBuilder().getRawOne.mockResolvedValue({ balance: '100' });
      mockQueryRunner.manager.create.mockReturnValue({ id: 'tx-1' });
      mockQueryRunner.manager.save.mockRejectedValue(new Error('DB error'));

      await expect(service.spend('user-1', 10)).rejects.toThrow('DB error');
      expect(mockQueryRunner.rollbackTransaction).toHaveBeenCalled();
      expect(mockQueryRunner.release).toHaveBeenCalled();
    });
  });

  describe('awardFragmentsTransactional', () => {
    let mockQueryRunner: any;

    beforeEach(() => {
      mockQueryRunner = {
        connect: jest.fn(),
        startTransaction: jest.fn(),
        commitTransaction: jest.fn(),
        rollbackTransaction: jest.fn(),
        release: jest.fn(),
        manager: {
          create: jest.fn(),
          save: jest.fn(),
        },
      };
    });

    it('should create transaction with BOSS_DEFEATED reason', async () => {
      mockQueryRunner.manager.create.mockReturnValue({ id: 'tx-1', amount: 10, reason: FragmentReason.BOSS_DEFEATED, relatedBossId: 'boss-1' });
      mockQueryRunner.manager.save.mockResolvedValue({ id: 'tx-1', amount: 10, reason: FragmentReason.BOSS_DEFEATED, relatedBossId: 'boss-1' });

      const result = await service.awardFragmentsTransactional(mockQueryRunner, 'user-1', 'boss-1', 10);

      expect(mockQueryRunner.manager.create).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          userId: 'user-1',
          amount: 10,
          reason: FragmentReason.BOSS_DEFEATED,
          relatedBossId: 'boss-1',
        }),
      );
      expect(result.amount).toBe(10);
      expect(result.reason).toBe(FragmentReason.BOSS_DEFEATED);
    });
  });
});
