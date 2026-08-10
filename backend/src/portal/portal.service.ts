import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoodBoardImage } from './entities/mood-board-image.entity';
import { KeyBelief } from './entities/key-belief.entity';
import { PortalSlide } from './entities/portal-slide.entity';
import { PortalSlideImage } from './entities/portal-slide-image.entity';
import { PortalNarrative } from './entities/portal-narrative.entity';
import { CreateMoodBoardImageDto } from './dto/create-mood-board-image.dto';
import { UpdateMoodBoardImageDto } from './dto/update-mood-board-image.dto';
import { CreateKeyBeliefDto } from './dto/create-key-belief.dto';
import { UpdateKeyBeliefDto } from './dto/update-key-belief.dto';
import { CreatePortalSlideDto } from './dto/create-portal-slide.dto';
import { UpdatePortalSlideDto } from './dto/update-portal-slide.dto';
import { AddSlideImageDto } from './dto/add-slide-image.dto';
import { UpsertNarrativeDto } from './dto/upsert-narrative.dto';

// Cantidad máxima de imágenes permitidas por diapositiva
export const MAX_SLIDE_IMAGES = 4;

export interface PortalOverview {
  moodBoard: MoodBoardImage[];
  beliefs: KeyBelief[];
  slides: PortalSlide[];
  narrative: PortalNarrative | null;
}

@Injectable()
export class PortalService {
  constructor(
    @InjectRepository(MoodBoardImage)
    private moodBoardRepository: Repository<MoodBoardImage>,
    @InjectRepository(KeyBelief)
    private keyBeliefRepository: Repository<KeyBelief>,
    @InjectRepository(PortalSlide)
    private slideRepository: Repository<PortalSlide>,
    @InjectRepository(PortalSlideImage)
    private slideImageRepository: Repository<PortalSlideImage>,
    @InjectRepository(PortalNarrative)
    private narrativeRepository: Repository<PortalNarrative>,
  ) {}

  // ---------------------------------------------------------------------------
  // Mood Board
  // ---------------------------------------------------------------------------

  async getMoodBoard(userId: string): Promise<MoodBoardImage[]> {
    return this.moodBoardRepository.find({
      where: { userId },
      order: { order: 'ASC' },
    });
  }

  async createMoodBoardImage(
    userId: string,
    dto: CreateMoodBoardImageDto,
  ): Promise<MoodBoardImage> {
    const image = this.moodBoardRepository.create({
      userId,
      imageUrl: dto.imageUrl,
      order: dto.order,
    });
    return this.moodBoardRepository.save(image);
  }

  async findMoodBoardImage(
    id: string,
    userId: string,
  ): Promise<MoodBoardImage> {
    const image = await this.moodBoardRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Imagen del mood board no encontrada');
    }
    if (image.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a esta imagen');
    }
    return image;
  }

  async updateMoodBoardImage(
    id: string,
    userId: string,
    dto: UpdateMoodBoardImageDto,
  ): Promise<MoodBoardImage> {
    const image = await this.findMoodBoardImage(id, userId);
    if (dto.imageUrl !== undefined) {
      image.imageUrl = dto.imageUrl;
    }
    if (dto.order !== undefined) {
      image.order = dto.order;
    }
    return this.moodBoardRepository.save(image);
  }

  async deleteMoodBoardImage(id: string, userId: string): Promise<void> {
    const image = await this.findMoodBoardImage(id, userId);
    await this.moodBoardRepository.remove(image);
  }

  // ---------------------------------------------------------------------------
  // Key Beliefs
  // ---------------------------------------------------------------------------

  async getBeliefs(userId: string): Promise<KeyBelief[]> {
    return this.keyBeliefRepository.find({
      where: { userId },
      order: { order: 'ASC' },
    });
  }

  async createBelief(
    userId: string,
    dto: CreateKeyBeliefDto,
  ): Promise<KeyBelief> {
    const belief = this.keyBeliefRepository.create({
      userId,
      text: dto.text,
      order: dto.order,
    });
    return this.keyBeliefRepository.save(belief);
  }

  async findBelief(id: string, userId: string): Promise<KeyBelief> {
    const belief = await this.keyBeliefRepository.findOne({ where: { id } });
    if (!belief) {
      throw new NotFoundException('Creencia no encontrada');
    }
    if (belief.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a esta creencia');
    }
    return belief;
  }

  async updateBelief(
    id: string,
    userId: string,
    dto: UpdateKeyBeliefDto,
  ): Promise<KeyBelief> {
    const belief = await this.findBelief(id, userId);
    if (dto.text !== undefined) {
      belief.text = dto.text;
    }
    if (dto.order !== undefined) {
      belief.order = dto.order;
    }
    return this.keyBeliefRepository.save(belief);
  }

  async deleteBelief(id: string, userId: string): Promise<void> {
    const belief = await this.findBelief(id, userId);
    await this.keyBeliefRepository.remove(belief);
  }

  // ---------------------------------------------------------------------------
  // Slides
  // ---------------------------------------------------------------------------

  async getSlides(userId: string): Promise<PortalSlide[]> {
    return this.slideRepository.find({
      where: { userId },
      relations: ['images'],
      order: { order: 'ASC', images: { order: 'ASC' } },
    });
  }

  async createSlide(
    userId: string,
    dto: CreatePortalSlideDto,
  ): Promise<PortalSlide> {
    const slide = this.slideRepository.create({
      userId,
      order: dto.order,
      title: dto.title ?? null,
      narrativeText: dto.narrativeText,
    });
    return this.slideRepository.save(slide);
  }

  async findSlide(id: string, userId: string): Promise<PortalSlide> {
    const slide = await this.slideRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!slide) {
      throw new NotFoundException('Diapositiva no encontrada');
    }
    if (slide.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a esta diapositiva');
    }
    return slide;
  }

  async updateSlide(
    id: string,
    userId: string,
    dto: UpdatePortalSlideDto,
  ): Promise<PortalSlide> {
    const slide = await this.findSlide(id, userId);
    if (dto.order !== undefined) {
      slide.order = dto.order;
    }
    if (dto.title !== undefined) {
      slide.title = dto.title;
    }
    if (dto.narrativeText !== undefined) {
      slide.narrativeText = dto.narrativeText;
    }
    return this.slideRepository.save(slide);
  }

  async deleteSlide(id: string, userId: string): Promise<void> {
    const slide = await this.findSlide(id, userId);
    // La relación OneToMany con onDelete CASCADE elimina las imágenes asociadas
    await this.slideRepository.remove(slide);
  }

  async addSlideImage(
    slideId: string,
    userId: string,
    dto: AddSlideImageDto,
  ): Promise<PortalSlideImage> {
    const slide = await this.findSlide(slideId, userId);

    const currentCount = await this.slideImageRepository.count({
      where: { slideId },
    });
    if (currentCount >= MAX_SLIDE_IMAGES) {
      throw new BadRequestException(
        `Una diapositiva no puede tener más de ${MAX_SLIDE_IMAGES} imágenes`,
      );
    }

    const image = this.slideImageRepository.create({
      slideId: slide.id,
      imageUrl: dto.imageUrl,
      order: dto.order,
    });
    return this.slideImageRepository.save(image);
  }

  async deleteSlideImage(
    slideId: string,
    imageId: string,
    userId: string,
  ): Promise<void> {
    // Valida ownership de la diapositiva antes de tocar la imagen
    await this.findSlide(slideId, userId);

    const image = await this.slideImageRepository.findOne({
      where: { id: imageId, slideId },
    });
    if (!image) {
      throw new NotFoundException('Imagen de la diapositiva no encontrada');
    }
    await this.slideImageRepository.remove(image);
  }

  // ---------------------------------------------------------------------------
  // Narrative (una por usuario, upsert)
  // ---------------------------------------------------------------------------

  async getNarrative(userId: string): Promise<PortalNarrative | null> {
    return this.narrativeRepository.findOne({ where: { userId } });
  }

  async upsertNarrative(
    userId: string,
    dto: UpsertNarrativeDto,
  ): Promise<PortalNarrative> {
    const existing = await this.narrativeRepository.findOne({
      where: { userId },
    });

    if (existing) {
      existing.text = dto.text;
      return this.narrativeRepository.save(existing);
    }

    const narrative = this.narrativeRepository.create({
      userId,
      text: dto.text,
    });
    return this.narrativeRepository.save(narrative);
  }

  // ---------------------------------------------------------------------------
  // Vista completa del portal
  // ---------------------------------------------------------------------------

  async getOverview(userId: string): Promise<PortalOverview> {
    const [moodBoard, beliefs, slides, narrative] = await Promise.all([
      this.getMoodBoard(userId),
      this.getBeliefs(userId),
      this.getSlides(userId),
      this.getNarrative(userId),
    ]);

    return { moodBoard, beliefs, slides, narrative };
  }
}
