import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PortalService } from './portal.service';
import {
  MoodBoardImage,
  KeyBelief,
  PortalSlide,
  PortalSlideImage,
  PortalNarrative,
} from './entities';

describe('PortalService', () => {
  let service: PortalService;
  let moodBoardRepo: jest.Mocked<Repository<MoodBoardImage>>;
  let beliefsRepo: jest.Mocked<Repository<KeyBelief>>;
  let slidesRepo: jest.Mocked<Repository<PortalSlide>>;
  let slideImagesRepo: jest.Mocked<Repository<PortalSlideImage>>;
  let narrativeRepo: jest.Mocked<Repository<PortalNarrative>>;

  const mockUserId = 'user-123';
  const mockOtherUserId = 'user-456';

  const createMockRepository = <T extends object>(): jest.Mocked<Repository<T>> => {
    return {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    } as any;
  };

  beforeEach(async () => {
    moodBoardRepo = createMockRepository<MoodBoardImage>();
    beliefsRepo = createMockRepository<KeyBelief>();
    slidesRepo = createMockRepository<PortalSlide>();
    slideImagesRepo = createMockRepository<PortalSlideImage>();
    narrativeRepo = createMockRepository<PortalNarrative>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortalService,
        {
          provide: getRepositoryToken(MoodBoardImage),
          useValue: moodBoardRepo,
        },
        {
          provide: getRepositoryToken(KeyBelief),
          useValue: beliefsRepo,
        },
        {
          provide: getRepositoryToken(PortalSlide),
          useValue: slidesRepo,
        },
        {
          provide: getRepositoryToken(PortalSlideImage),
          useValue: slideImagesRepo,
        },
        {
          provide: getRepositoryToken(PortalNarrative),
          useValue: narrativeRepo,
        },
      ],
    }).compile();

    service = module.get<PortalService>(PortalService);
  });

  describe('Mood Board', () => {
    it('should get mood board for user', async () => {
      const image: MoodBoardImage = {
        id: '1',
        imageUrl: 'http://img1.com',
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      };
      moodBoardRepo.find.mockResolvedValue([image]);

      const result = await service.getMoodBoard(mockUserId);

      expect(result).toHaveLength(1);
      expect(moodBoardRepo.find).toHaveBeenCalledWith({
        where: { userId: mockUserId },
        order: { order: 'ASC', createdAt: 'ASC' },
      });
    });

    it('should create mood board image', async () => {
      const dto = { imageUrl: 'http://img.com' };
      const created: MoodBoardImage = {
        id: '1',
        ...dto,
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      };
      moodBoardRepo.create.mockReturnValue(created);
      moodBoardRepo.save.mockResolvedValue(created);

      const result = await service.createMoodBoardImage(mockUserId, dto);

      expect(result.id).toBe('1');
    });

    it('should not allow user to update other user mood board image', async () => {
      const image: MoodBoardImage = {
        id: '1',
        imageUrl: 'http://img.com',
        order: 0,
        userId: mockOtherUserId,
        user: null as any,
        createdAt: new Date(),
      };
      moodBoardRepo.findOne.mockResolvedValue(image);

      await expect(
        service.updateMoodBoardImage(mockUserId, '1', { order: 1 }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should delete mood board image', async () => {
      const image: MoodBoardImage = {
        id: '1',
        imageUrl: 'http://img.com',
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      };
      moodBoardRepo.findOne.mockResolvedValue(image);
      moodBoardRepo.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.deleteMoodBoardImage(mockUserId, '1');

      expect(moodBoardRepo.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when mood board image not found', async () => {
      moodBoardRepo.findOne.mockResolvedValue(null);

      await expect(
        service.deleteMoodBoardImage(mockUserId, 'nonexistent'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('Key Beliefs', () => {
    it('should get beliefs for user', async () => {
      const belief: KeyBelief = {
        id: '1',
        text: 'Belief 1',
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      };
      beliefsRepo.find.mockResolvedValue([belief]);

      const result = await service.getBeliefs(mockUserId);

      expect(result).toHaveLength(1);
    });

    it('should create belief', async () => {
      const dto = { text: 'New belief' };
      const created: KeyBelief = {
        id: '1',
        ...dto,
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      };
      beliefsRepo.create.mockReturnValue(created);
      beliefsRepo.save.mockResolvedValue(created);

      const result = await service.createBelief(mockUserId, dto);

      expect(result.id).toBe('1');
    });
  });

  describe('Portal Slides', () => {
    it('should get slides with images for user', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide 1',
        narrativeText: 'Text 1',
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.find.mockResolvedValue([slide]);

      const result = await service.getSlides(mockUserId);

      expect(result).toHaveLength(1);
    });

    it('should create slide', async () => {
      const dto = { title: 'New Slide', narrativeText: 'Content' };
      const created: PortalSlide = {
        id: '1',
        ...dto,
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.create.mockReturnValue(created);
      slidesRepo.save.mockResolvedValue(created);

      const result = await service.createSlide(mockUserId, dto);

      expect(result.id).toBe('1');
    });

    it('should delete slide with cascade', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide',
        narrativeText: null as any,
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.findOne.mockResolvedValue(slide);
      slidesRepo.delete.mockResolvedValue({ affected: 1, raw: {} });

      await service.deleteSlide(mockUserId, '1');

      expect(slidesRepo.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('Slide Images - Limit of 4', () => {
    it('should throw BadRequestException when adding 5th image', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide',
        narrativeText: null as any,
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.findOne.mockResolvedValue(slide);
      slideImagesRepo.count.mockResolvedValue(4);

      await expect(
        service.addSlideImage(mockUserId, '1', { imageUrl: 'http://img.com' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should allow adding image when slide has less than 4 images', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide',
        narrativeText: null as any,
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const created: PortalSlideImage = {
        id: 'img1',
        imageUrl: 'http://img.com',
        order: 3,
        slideId: '1',
        slide: slide,
        createdAt: new Date(),
      };
      slidesRepo.findOne.mockResolvedValue(slide);
      slideImagesRepo.count.mockResolvedValue(3);
      slideImagesRepo.create.mockReturnValue(created);
      slideImagesRepo.save.mockResolvedValue(created);

      const result = await service.addSlideImage(mockUserId, '1', { imageUrl: 'http://img.com' });

      expect(result.id).toBe('img1');
    });

    it('should not allow user to add image to another user slide', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide',
        narrativeText: null as any,
        order: 0,
        userId: mockOtherUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.findOne.mockResolvedValue(slide);

      await expect(
        service.addSlideImage(mockUserId, '1', { imageUrl: 'http://img.com' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Portal Narrative - Upsert', () => {
    it('should create narrative when none exists', async () => {
      const dto = { text: 'My portal narrative' };
      const created: PortalNarrative = {
        id: '1',
        ...dto,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      narrativeRepo.findOne.mockResolvedValue(null);
      narrativeRepo.create.mockReturnValue(created);
      narrativeRepo.save.mockResolvedValue(created);

      const result = await service.upsertNarrative(mockUserId, dto);

      expect(narrativeRepo.create).toHaveBeenCalledWith({
        userId: mockUserId,
        text: dto.text,
      });
      expect(result.text).toBe('My portal narrative');
    });

    it('should update narrative when one already exists', async () => {
      const dto = { text: 'Updated narrative' };
      const existing: PortalNarrative = {
        id: '1',
        text: 'Old narrative',
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      narrativeRepo.findOne.mockResolvedValue(existing);
      const updated = { ...existing, text: dto.text };
      narrativeRepo.save.mockResolvedValue(updated);

      const result = await service.upsertNarrative(mockUserId, dto);

      expect(narrativeRepo.create).not.toHaveBeenCalled();
      expect(result.text).toBe('Updated narrative');
    });

    it('should get narrative for user', async () => {
      const narrative: PortalNarrative = {
        id: '1',
        text: 'My narrative',
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      narrativeRepo.findOne.mockResolvedValue(narrative);

      const result = await service.getNarrative(mockUserId);

      expect(result?.text).toBe('My narrative');
    });

    it('should return null when no narrative exists', async () => {
      narrativeRepo.findOne.mockResolvedValue(null);

      const result = await service.getNarrative(mockUserId);

      expect(result).toBeNull();
    });
  });

  describe('Ownership checks', () => {
    it('should not allow user to access another user mood board', async () => {
      const image: MoodBoardImage = {
        id: '1',
        imageUrl: 'http://img.com',
        order: 0,
        userId: mockOtherUserId,
        user: null as any,
        createdAt: new Date(),
      };
      moodBoardRepo.findOne.mockResolvedValue(image);

      await expect(
        service.deleteMoodBoardImage(mockUserId, '1'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should not allow user to access another user beliefs', async () => {
      const belief: KeyBelief = {
        id: '1',
        text: 'Belief',
        order: 0,
        userId: mockOtherUserId,
        user: null as any,
        createdAt: new Date(),
      };
      beliefsRepo.findOne.mockResolvedValue(belief);

      await expect(
        service.updateBelief(mockUserId, '1', { text: 'New' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should not allow user to access another user slides', async () => {
      const slide: PortalSlide = {
        id: '1',
        title: 'Slide',
        narrativeText: null as any,
        order: 0,
        userId: mockOtherUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      slidesRepo.findOne.mockResolvedValue(slide);

      await expect(
        service.updateSlide(mockUserId, '1', { title: 'New' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Get All Portal', () => {
    it('should return all portal data in one response', async () => {
      const moodBoard: MoodBoardImage[] = [{
        id: '1',
        imageUrl: 'http://img.com',
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      }];
      const beliefs: KeyBelief[] = [{
        id: '1',
        text: 'Belief',
        order: 0,
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
      }];
      const slides: PortalSlide[] = [{
        id: '1',
        title: 'Slide',
        narrativeText: 'Text',
        order: 0,
        userId: mockUserId,
        user: null as any,
        images: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
      const narrative: PortalNarrative = {
        id: '1',
        text: 'Narrative',
        userId: mockUserId,
        user: null as any,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      moodBoardRepo.find.mockResolvedValue(moodBoard);
      beliefsRepo.find.mockResolvedValue(beliefs);
      slidesRepo.find.mockResolvedValue(slides);
      narrativeRepo.findOne.mockResolvedValue(narrative);

      const result = await service.getPortal(mockUserId);

      expect(result.moodBoard).toHaveLength(1);
      expect(result.beliefs).toHaveLength(1);
      expect(result.slides).toHaveLength(1);
      expect(result.narrative?.text).toBe('Narrative');
    });
  });
});
