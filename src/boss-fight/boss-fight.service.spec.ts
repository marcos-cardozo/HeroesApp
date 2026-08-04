import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BossFightService } from './boss-fight.service';
import { AttemptStatus } from './entities/user-boss-attempt.entity';
import { Boss } from './entities/boss.entity';
import { BossQuestion } from './entities/boss-question.entity';
import { UserBossAttempt } from './entities/user-boss-attempt.entity';
import { UserBossAnswer } from './entities/user-boss-answer.entity';
import { UserBossDefeat } from './entities/user-boss-defeat.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { ForbiddenException, NotFoundException, BadRequestException } from '@nestjs/common';

describe('BossFightService', () => {
  let service: BossFightService;
  let bossRepo: jest.Mocked<Repository<Boss>>;
  let questionRepo: jest.Mocked<Repository<BossQuestion>>;
  let attemptRepo: jest.Mocked<Repository<UserBossAttempt>>;
  let answerRepo: jest.Mocked<Repository<UserBossAnswer>>;
  let defeatRepo: jest.Mocked<Repository<UserBossDefeat>>;
  let challengesService: jest.Mocked<ChallengesService>;

  const mockBoss = {
    id: 'boss-1',
    challengeId: 'challenge-1',
    name: 'Boss Final',
    description: 'Boss de prueba',
    totalQuestions: 3,
    maxFails: 3,
    order: 1,
    questions: [
      { id: 'q1', text: 'Pregunta 1', options: ['A', 'B', 'C', 'D'], correctOptionIndex: 1, order: 1 },
      { id: 'q2', text: 'Pregunta 2', options: ['A', 'B', 'C', 'D'], correctOptionIndex: 2, order: 2 },
      { id: 'q3', text: 'Pregunta 3', options: ['A', 'B', 'C', 'D'], correctOptionIndex: 0, order: 3 },
    ],
    challenge: { slug: 'modo-creativo' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BossFightService,
        {
          provide: getRepositoryToken(Boss),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BossQuestion),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserBossAttempt),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserBossAnswer),
          useValue: {
            save: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserBossDefeat),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: ChallengesService,
          useValue: {
            findBySlug: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BossFightService>(BossFightService);
    bossRepo = module.get(getRepositoryToken(Boss));
    questionRepo = module.get(getRepositoryToken(BossQuestion));
    attemptRepo = module.get(getRepositoryToken(UserBossAttempt));
    answerRepo = module.get(getRepositoryToken(UserBossAnswer));
    defeatRepo = module.get(getRepositoryToken(UserBossDefeat));
    challengesService = module.get(ChallengesService);
  });

  describe('answerQuestion - WIN flow', () => {
    it('should return RESULT with WON when all questions answered correctly', async () => {
      const mockAttempt = {
        id: 'attempt-1',
        userId: 'user-1',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 2,
        failCount: 0,
        boss: mockBoss,
      };

      attemptRepo.findOne.mockResolvedValue(mockAttempt as any);
      answerRepo.save.mockResolvedValue({} as any);
      answerRepo.count.mockResolvedValue(3);

      const result = await service.answerQuestion('attempt-1', 0, 'user-1');

      expect(result.type).toBe('RESULT');
      expect(result.status).toBe(AttemptStatus.WON);
      expect(defeatRepo.save).toHaveBeenCalled();
    });

    it('should NOT leak correctOptionIndex in response', async () => {
      const mockAttempt = {
        id: 'attempt-1',
        userId: 'user-1',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 0,
        failCount: 0,
        boss: mockBoss,
      };

      attemptRepo.findOne.mockResolvedValue(mockAttempt as any);
      answerRepo.save.mockResolvedValue({} as any);
      answerRepo.count.mockResolvedValue(1);
      attemptRepo.save.mockResolvedValue({ ...mockAttempt, currentQuestionIndex: 1 } as any);

      const result = await service.answerQuestion('attempt-1', 1, 'user-1');

      expect(result.type).toBe('QUESTION');
      expect(result.question).toBeDefined();
      expect((result.question as any).correctOptionIndex).toBeUndefined();
      expect(result.question!.options).toEqual(['A', 'B', 'C', 'D']);
    });
  });

  describe('answerQuestion - LOSE flow', () => {
    it('should return RESULT with LOST when maxFails exceeded', async () => {
      const mockAttempt = {
        id: 'attempt-1',
        userId: 'user-1',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 0,
        failCount: 3,
        boss: { ...mockBoss, maxFails: 3 },
      };

      attemptRepo.findOne.mockResolvedValue(mockAttempt as any);
      answerRepo.save.mockResolvedValue({} as any);
      answerRepo.count.mockResolvedValue(0);

      const result = await service.answerQuestion('attempt-1', 99, 'user-1');

      expect(result.type).toBe('RESULT');
      expect(result.status).toBe(AttemptStatus.LOST);
      expect(defeatRepo.save).not.toHaveBeenCalled();
    });

    it('should NOT leak correctOptionIndex when returning result', async () => {
      const mockAttempt = {
        id: 'attempt-1',
        userId: 'user-1',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 0,
        failCount: 3,
        boss: { ...mockBoss, maxFails: 3 },
      };

      attemptRepo.findOne.mockResolvedValue(mockAttempt as any);
      answerRepo.save.mockResolvedValue({} as any);
      answerRepo.count.mockResolvedValue(0);

      const result = await service.answerQuestion('attempt-1', 99, 'user-1');

      expect(result.type).toBe('RESULT');
      expect((result as any).correctOptionIndex).toBeUndefined();
    });
  });

  describe('answerQuestion - ownership validation', () => {
    it('should throw ForbiddenException if attempt belongs to different user', async () => {
      const mockAttempt = {
        id: 'attempt-1',
        userId: 'other-user',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 0,
        failCount: 0,
        boss: mockBoss,
      };

      attemptRepo.findOne.mockResolvedValue(mockAttempt as any);

      await expect(service.answerQuestion('attempt-1', 1, 'user-1')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAllForUser', () => {
    it('should return bosses with unlock and defeat status', async () => {
      bossRepo.find.mockResolvedValue([mockBoss as any]);
      defeatRepo.find.mockResolvedValue([{ bossId: 'boss-1' }] as any);
      challengesService.findBySlug.mockResolvedValue({
        progress: { completed: 5, total: 5, percentage: 100 }
      } as any);

      const result = await service.findAllForUser('user-1');

      expect(result.bosses).toHaveLength(1);
      expect(result.bosses[0].unlocked).toBe(true);
      expect(result.bosses[0].defeated).toBe(true);
      expect(result.totalDefeated).toBe(1);
    });

    it('should show boss as locked when challenge not completed', async () => {
      bossRepo.find.mockResolvedValue([mockBoss as any]);
      defeatRepo.find.mockResolvedValue([] as any);
      challengesService.findBySlug.mockResolvedValue({
        progress: { completed: 3, total: 5, percentage: 60 }
      } as any);

      const result = await service.findAllForUser('user-1');

      expect(result.bosses[0].unlocked).toBe(false);
      expect(result.bosses[0].defeated).toBe(false);
    });
  });

  describe('startAttempt', () => {
    it('should throw ForbiddenException if boss not unlocked', async () => {
      bossRepo.findOne.mockResolvedValue({ ...mockBoss, challenge: { slug: 'modo-creativo' } } as any);
      challengesService.findBySlug.mockResolvedValue({
        progress: { completed: 3, total: 5, percentage: 60 }
      } as any);

      await expect(service.startAttempt('modo-creativo', 'user-1')).rejects.toThrow(ForbiddenException);
    });

    it('should return existing in-progress attempt if exists', async () => {
      const existingAttempt = {
        id: 'attempt-existing',
        userId: 'user-1',
        bossId: 'boss-1',
        status: AttemptStatus.IN_PROGRESS,
        currentQuestionIndex: 1,
        failCount: 0,
        boss: mockBoss,
      };

      bossRepo.findOne.mockResolvedValue(mockBoss as any);
      challengesService.findBySlug.mockResolvedValue({
        progress: { completed: 5, total: 5, percentage: 100 }
      } as any);
      attemptRepo.findOne.mockResolvedValue(existingAttempt as any);

      const result = await service.startAttempt('modo-creativo', 'user-1');

      expect(result.attemptId).toBe('attempt-existing');
      expect(result.currentIndex).toBe(1);
    });
  });
});
