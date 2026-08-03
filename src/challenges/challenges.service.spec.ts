import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChallengesService } from './challenges.service';
import { Challenge } from './entities/challenge.entity';
import { ChecklistSection } from './entities/checklist-section.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { UserChecklistProgress } from './entities/user-checklist-progress.entity';
import { NotFoundException } from '@nestjs/common';

describe('ChallengesService', () => {
  let service: ChallengesService;
  let challengeRepo: jest.Mocked<Repository<Challenge>>;
  let sectionRepo: jest.Mocked<Repository<ChecklistSection>>;
  let itemRepo: jest.Mocked<Repository<ChecklistItem>>;
  let progressRepo: jest.Mocked<Repository<UserChecklistProgress>>;

  const mockChallenge = {
    id: 'challenge-1',
    slug: 'modo-creativo',
    name: 'Modo Creativo',
    description: 'Mentalidad y bases',
    durationDays: 5,
    totalTasks: 3,
    order: 1,
    active: true,
    sections: [
      {
        id: 'section-1',
        title: 'Inicio',
        order: 1,
        items: [
          { id: 'item-1', title: 'Item 1', order: 1 },
          { id: 'item-2', title: 'Item 2', order: 2 },
        ],
      },
      {
        id: 'section-2',
        title: 'Conceptos',
        order: 2,
        items: [
          { id: 'item-3', title: 'Item 3', order: 1 },
        ],
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengesService,
        {
          provide: getRepositoryToken(Challenge),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ChecklistSection),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(ChecklistItem),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserChecklistProgress),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
    challengeRepo = module.get(getRepositoryToken(Challenge));
    sectionRepo = module.get(getRepositoryToken(ChecklistSection));
    itemRepo = module.get(getRepositoryToken(ChecklistItem));
    progressRepo = module.get(getRepositoryToken(UserChecklistProgress));
  });

  describe('findAllForUser', () => {
    it('should return challenges with progress (0% - not started)', async () => {
      challengeRepo.find.mockResolvedValue([mockChallenge as any]);
      progressRepo.find.mockResolvedValue([]);

      const result = await service.findAllForUser('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].progress.completed).toBe(0);
      expect(result[0].progress.total).toBe(3);
      expect(result[0].progress.percentage).toBe(0);
    });

    it('should return challenges with progress (partial - 33%)', async () => {
      challengeRepo.find.mockResolvedValue([mockChallenge as any]);
      progressRepo.find.mockResolvedValue([
        { checklistItemId: 'item-1', completedAt: new Date() },
      ] as any);

      const result = await service.findAllForUser('user-1');

      expect(result[0].progress.completed).toBe(1);
      expect(result[0].progress.total).toBe(3);
      expect(result[0].progress.percentage).toBe(33);
    });

    it('should return challenges with progress (100% - completed)', async () => {
      challengeRepo.find.mockResolvedValue([mockChallenge as any]);
      progressRepo.find.mockResolvedValue([
        { checklistItemId: 'item-1', completedAt: new Date() },
        { checklistItemId: 'item-2', completedAt: new Date() },
        { checklistItemId: 'item-3', completedAt: new Date() },
      ] as any);

      const result = await service.findAllForUser('user-1');

      expect(result[0].progress.completed).toBe(3);
      expect(result[0].progress.total).toBe(3);
      expect(result[0].progress.percentage).toBe(100);
    });
  });

  describe('findBySlug', () => {
    it('should throw NotFoundException if challenge does not exist', async () => {
      challengeRepo.findOne.mockResolvedValue(null);

      await expect(service.findBySlug('non-existent', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should return challenge with sections and items with status', async () => {
      challengeRepo.findOne.mockResolvedValue(mockChallenge as any);
      sectionRepo.find.mockResolvedValue(mockChallenge.sections as any);
      progressRepo.find.mockResolvedValue([
        { checklistItemId: 'item-1', completedAt: new Date('2024-01-15') },
      ] as any);

      const result = await service.findBySlug('modo-creativo', 'user-1');

      expect(result.slug).toBe('modo-creativo');
      expect(result.sections).toHaveLength(2);
      expect(result.sections[0].items[0].completed).toBe(true);
      expect(result.sections[0].items[1].completed).toBe(false);
      expect(result.progress.completed).toBe(1);
    });
  });

  describe('completeItem', () => {
    it('should throw NotFoundException if challenge does not exist', async () => {
      challengeRepo.findOne.mockResolvedValue(null);

      await expect(service.completeItem('non-existent', 'item-1', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if item does not belong to challenge', async () => {
      challengeRepo.findOne.mockResolvedValue(mockChallenge as any);
      itemRepo.findOne.mockResolvedValue({
        id: 'other-item',
        section: { challengeId: 'other-challenge' },
      } as any);

      await expect(service.completeItem('modo-creativo', 'other-item', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should complete item if not already completed', async () => {
      challengeRepo.findOne.mockResolvedValue(mockChallenge as any);
      itemRepo.findOne.mockResolvedValue({ id: 'item-1', section: { challengeId: 'challenge-1' } } as any);
      progressRepo.findOne.mockResolvedValue(null);
      progressRepo.save.mockResolvedValue({} as any);

      const result = await service.completeItem('modo-creativo', 'item-1', 'user-1');

      expect(result.message).toBe('Item marcado como completado');
      expect(progressRepo.save).toHaveBeenCalled();
    });

    it('should be idempotent if item already completed', async () => {
      challengeRepo.findOne.mockResolvedValue(mockChallenge as any);
      itemRepo.findOne.mockResolvedValue({ id: 'item-1', section: { challengeId: 'challenge-1' } } as any);
      progressRepo.findOne.mockResolvedValue({ id: 'progress-1' } as any);

      const result = await service.completeItem('modo-creativo', 'item-1', 'user-1');

      expect(result.message).toBe('Item ya estaba completado');
      expect(progressRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('uncompleteItem', () => {
    it('should delete progress for item', async () => {
      challengeRepo.findOne.mockResolvedValue(mockChallenge as any);
      itemRepo.findOne.mockResolvedValue({ id: 'item-1', section: { challengeId: 'challenge-1' } } as any);
      progressRepo.delete.mockResolvedValue({ affected: 1 } as any);

      const result = await service.uncompleteItem('modo-creativo', 'item-1', 'user-1');

      expect(result.message).toBe('Completado deshecho');
      expect(progressRepo.delete).toHaveBeenCalledWith({ userId: 'user-1', checklistItemId: 'item-1' });
    });
  });
});
