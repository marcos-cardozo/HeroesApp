import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PortalService, MAX_SLIDE_IMAGES } from './portal.service';
import { MoodBoardImage } from './entities/mood-board-image.entity';
import { KeyBelief } from './entities/key-belief.entity';
import { PortalSlide } from './entities/portal-slide.entity';
import { PortalSlideImage } from './entities/portal-slide-image.entity';
import { PortalNarrative } from './entities/portal-narrative.entity';

describe('PortalService', () => {
  let service: PortalService;
  let moodBoardRepository: jest.Mocked<Repository<MoodBoardImage>>;
  let keyBeliefRepository: jest.Mocked<Repository<KeyBelief>>;
  let slideRepository: jest.Mocked<Repository<PortalSlide>>;
  let slideImageRepository: jest.Mocked<Repository<PortalSlideImage>>;
  let narrativeRepository: jest.Mocked<Repository<PortalNarrative>>;

  const buildMockRepo = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortalService,
        { provide: getRepositoryToken(MoodBoardImage), useValue: buildMockRepo() },
        { provide: getRepositoryToken(KeyBelief), useValue: buildMockRepo() },
        { provide: getRepositoryToken(PortalSlide), useValue: buildMockRepo() },
        { provide: getRepositoryToken(PortalSlideImage), useValue: buildMockRepo() },
        { provide: getRepositoryToken(PortalNarrative), useValue: buildMockRepo() },
      ],
    }).compile();

    service = module.get<PortalService>(PortalService);
    moodBoardRepository = module.get(getRepositoryToken(MoodBoardImage));
    keyBeliefRepository = module.get(getRepositoryToken(KeyBelief));
    slideRepository = module.get(getRepositoryToken(PortalSlide));
    slideImageRepository = module.get(getRepositoryToken(PortalSlideImage));
    narrativeRepository = module.get(getRepositoryToken(PortalNarrative));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ---------------------------------------------------------------------------
  // Caso crítico 1: límite de 4 imágenes por diapositiva
  // ---------------------------------------------------------------------------
  describe('addSlideImage - límite de imágenes', () => {
    it('debe lanzar BadRequestException al intentar agregar la 5ta imagen', async () => {
      const slide = { id: 'slide-1', userId: 'user-1', images: [] };
      slideRepository.findOne.mockResolvedValue(slide as any);
      // Ya existen 4 imágenes -> agregar otra debe fallar
      slideImageRepository.count.mockResolvedValue(MAX_SLIDE_IMAGES);

      await expect(
        service.addSlideImage('slide-1', 'user-1', {
          imageUrl: 'https://i.ytimg.com/vi/iqs2oooSRis/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlfS8KWTRNjNNWJcXCy6S91AAejg',
          order: 4,
        }),
      ).rejects.toThrow(BadRequestException);

      expect(slideImageRepository.save).not.toHaveBeenCalled();
    });

    it('debe agregar la imagen cuando hay menos de 4', async () => {
      const slide = { id: 'slide-1', userId: 'user-1', images: [] };
      slideRepository.findOne.mockResolvedValue(slide as any);
      slideImageRepository.count.mockResolvedValue(3);
      const created = { id: 'img-1', slideId: 'slide-1' };
      slideImageRepository.create.mockReturnValue(created as any);
      slideImageRepository.save.mockResolvedValue(created as any);

      const result = await service.addSlideImage('slide-1', 'user-1', {
        imageUrl: 'https://slidemodel.com/wp-content/uploads/FF0497-01-two-options-comparison-slide-template-16x9-1.jpg',
        order: 3,
      });

      expect(slideImageRepository.save).toHaveBeenCalled();
      expect(result).toEqual(created);
    });
  });

  // ---------------------------------------------------------------------------
  // Caso crítico 2: upsert de la narrativa (crear vs actualizar)
  // ---------------------------------------------------------------------------
  describe('upsertNarrative', () => {
    it('debe crear la narrativa cuando no existe', async () => {
      narrativeRepository.findOne.mockResolvedValue(null);
      const created = { id: 'n-1', userId: 'user-1', text: 'Mi visión' };
      narrativeRepository.create.mockReturnValue(created as any);
      narrativeRepository.save.mockResolvedValue(created as any);

      const result = await service.upsertNarrative('user-1', { text: 'Mi visión' });

      expect(narrativeRepository.create).toHaveBeenCalledWith({
        userId: 'user-1',
        text: 'Mi visión',
      });
      expect(narrativeRepository.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });

    it('debe actualizar la narrativa cuando ya existe', async () => {
      const existing = { id: 'n-1', userId: 'user-1', text: 'Texto viejo' };
      narrativeRepository.findOne.mockResolvedValue(existing as any);
      narrativeRepository.save.mockImplementation(async (n) => n as any);

      const result = await service.upsertNarrative('user-1', {
        text: 'Texto nuevo',
      });

      expect(narrativeRepository.create).not.toHaveBeenCalled();
      expect(result.text).toBe('Texto nuevo');
      expect(narrativeRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'n-1', text: 'Texto nuevo' }),
      );
    });
  });

  // ---------------------------------------------------------------------------
  // Caso crítico 3: verificación de ownership
  // ---------------------------------------------------------------------------
  describe('ownership', () => {
    it('findMoodBoardImage lanza NotFoundException si no existe', async () => {
      moodBoardRepository.findOne.mockResolvedValue(null);
      await expect(
        service.findMoodBoardImage('x', 'user-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('findMoodBoardImage lanza ForbiddenException si es de otro usuario', async () => {
      moodBoardRepository.findOne.mockResolvedValue({
        id: 'img-1',
        userId: 'other-user',
      } as any);
      await expect(
        service.updateMoodBoardImage('img-1', 'user-1', { order: 1 }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('findBelief lanza ForbiddenException si la creencia es de otro usuario', async () => {
      keyBeliefRepository.findOne.mockResolvedValue({
        id: 'b-1',
        userId: 'other-user',
      } as any);
      await expect(service.findBelief('b-1', 'user-1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('findSlide lanza ForbiddenException si la diapositiva es de otro usuario', async () => {
      slideRepository.findOne.mockResolvedValue({
        id: 'slide-1',
        userId: 'other-user',
        images: [],
      } as any);
      await expect(service.findSlide('slide-1', 'user-1')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('addSlideImage no permite operar sobre una diapositiva ajena', async () => {
      slideRepository.findOne.mockResolvedValue({
        id: 'slide-1',
        userId: 'other-user',
        images: [],
      } as any);
      await expect(
        service.addSlideImage('slide-1', 'user-1', {
          imageUrl: 'https://example.com/a.png',
          order: 0,
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  // ---------------------------------------------------------------------------
  // Vista completa
  // ---------------------------------------------------------------------------
  describe('getOverview', () => {
    it('devuelve moodBoard, beliefs, slides y narrative juntos', async () => {
      moodBoardRepository.find.mockResolvedValue([{ id: 'm1' }] as any);
      keyBeliefRepository.find.mockResolvedValue([{ id: 'b1' }] as any);
      slideRepository.find.mockResolvedValue([{ id: 's1' }] as any);
      narrativeRepository.findOne.mockResolvedValue({ id: 'n1' } as any);

      const result = await service.getOverview('user-1');

      expect(result).toEqual({
        moodBoard: [{ id: 'm1' }],
        beliefs: [{ id: 'b1' }],
        slides: [{ id: 's1' }],
        narrative: { id: 'n1' },
      });
    });

    it('narrative es null cuando el usuario no tiene narrativa', async () => {
      moodBoardRepository.find.mockResolvedValue([] as any);
      keyBeliefRepository.find.mockResolvedValue([] as any);
      slideRepository.find.mockResolvedValue([] as any);
      narrativeRepository.findOne.mockResolvedValue(null);

      const result = await service.getOverview('user-1');
      expect(result.narrative).toBeNull();
    });
  });
});
