import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  MoodBoardImage,
  KeyBelief,
  PortalSlide,
  PortalSlideImage,
  PortalNarrative,
} from './entities';
import {
  CreateMoodBoardImageDto,
  UpdateMoodBoardImageDto,
  CreateKeyBeliefDto,
  UpdateKeyBeliefDto,
  CreatePortalSlideDto,
  UpdatePortalSlideDto,
  CreateSlideImageDto,
  UpdatePortalNarrativeDto,
} from './dto';

const MAX_IMAGES_PER_SLIDE = 4;

@Injectable()
export class PortalService {
  constructor(
    @InjectRepository(MoodBoardImage)
    private moodBoardImageRepository: Repository<MoodBoardImage>,
    @InjectRepository(KeyBelief)
    private keyBeliefRepository: Repository<KeyBelief>,
    @InjectRepository(PortalSlide)
    private portalSlideRepository: Repository<PortalSlide>,
    @InjectRepository(PortalSlideImage)
    private portalSlideImageRepository: Repository<PortalSlideImage>,
    @InjectRepository(PortalNarrative)
    private portalNarrativeRepository: Repository<PortalNarrative>,
  ) {}

  // ========== Mood Board ==========

  async getMoodBoard(userId: string): Promise<MoodBoardImage[]> {
    return this.moodBoardImageRepository.find({
      where: { userId },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async createMoodBoardImage(
    userId: string,
    dto: CreateMoodBoardImageDto,
  ): Promise<MoodBoardImage> {
    const image = this.moodBoardImageRepository.create({
      userId,
      imageUrl: dto.imageUrl,
      order: dto.order ?? 0,
    });
    return this.moodBoardImageRepository.save(image);
  }

  async updateMoodBoardImage(
    userId: string,
    id: string,
    dto: UpdateMoodBoardImageDto,
  ): Promise<MoodBoardImage> {
    const image = await this.findMoodBoardImageOrFail(id);
    this.checkOwnership(image, userId);

    if (dto.order !== undefined) {
      image.order = dto.order;
    }

    return this.moodBoardImageRepository.save(image);
  }

  async deleteMoodBoardImage(userId: string, id: string): Promise<void> {
    const image = await this.findMoodBoardImageOrFail(id);
    this.checkOwnership(image, userId);
    await this.moodBoardImageRepository.delete(id);
  }

  private async findMoodBoardImageOrFail(id: string): Promise<MoodBoardImage> {
    const image = await this.moodBoardImageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Mood board image not found');
    }
    return image;
  }

  // ========== Key Beliefs ==========

  async getBeliefs(userId: string): Promise<KeyBelief[]> {
    return this.keyBeliefRepository.find({
      where: { userId },
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async createBelief(userId: string, dto: CreateKeyBeliefDto): Promise<KeyBelief> {
    const belief = this.keyBeliefRepository.create({
      userId,
      text: dto.text,
      order: dto.order ?? 0,
    });
    return this.keyBeliefRepository.save(belief);
  }

  async updateBelief(
    userId: string,
    id: string,
    dto: UpdateKeyBeliefDto,
  ): Promise<KeyBelief> {
    const belief = await this.findBeliefOrFail(id);
    this.checkOwnership(belief, userId);

    if (dto.text !== undefined) {
      belief.text = dto.text;
    }
    if (dto.order !== undefined) {
      belief.order = dto.order;
    }

    return this.keyBeliefRepository.save(belief);
  }

  async deleteBelief(userId: string, id: string): Promise<void> {
    const belief = await this.findBeliefOrFail(id);
    this.checkOwnership(belief, userId);
    await this.keyBeliefRepository.delete(id);
  }

  private async findBeliefOrFail(id: string): Promise<KeyBelief> {
    const belief = await this.keyBeliefRepository.findOne({ where: { id } });
    if (!belief) {
      throw new NotFoundException('Key belief not found');
    }
    return belief;
  }

  // ========== Portal Slides ==========

  async getSlides(userId: string): Promise<PortalSlide[]> {
    return this.portalSlideRepository.find({
      where: { userId },
      relations: ['images'],
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async createSlide(
    userId: string,
    dto: CreatePortalSlideDto,
  ): Promise<PortalSlide> {
    const slide = this.portalSlideRepository.create({
      userId,
      title: dto.title,
      narrativeText: dto.narrativeText,
      order: dto.order ?? 0,
    });
    return this.portalSlideRepository.save(slide);
  }

  async updateSlide(
    userId: string,
    id: string,
    dto: UpdatePortalSlideDto,
  ): Promise<PortalSlide> {
    const slide = await this.findSlideOrFail(id);
    this.checkOwnership(slide, userId);

    if (dto.title !== undefined) {
      slide.title = dto.title;
    }
    if (dto.narrativeText !== undefined) {
      slide.narrativeText = dto.narrativeText;
    }
    if (dto.order !== undefined) {
      slide.order = dto.order;
    }

    return this.portalSlideRepository.save(slide);
  }

  async deleteSlide(userId: string, id: string): Promise<void> {
    const slide = await this.findSlideOrFail(id);
    this.checkOwnership(slide, userId);
    await this.portalSlideRepository.delete(id); // Cascade deletes images
  }

  async addSlideImage(
    userId: string,
    slideId: string,
    dto: CreateSlideImageDto,
  ): Promise<PortalSlideImage> {
    const slide = await this.findSlideOrFail(slideId);
    this.checkOwnership(slide, userId);

    const imageCount = await this.portalSlideImageRepository.count({
      where: { slideId },
    });

    if (imageCount >= MAX_IMAGES_PER_SLIDE) {
      throw new BadRequestException(
        `Slide can have maximum ${MAX_IMAGES_PER_SLIDE} images`,
      );
    }

    const image = this.portalSlideImageRepository.create({
      slideId,
      imageUrl: dto.imageUrl,
      order: dto.order ?? imageCount,
    });
    return this.portalSlideImageRepository.save(image);
  }

  async deleteSlideImage(
    userId: string,
    slideId: string,
    imageId: string,
  ): Promise<void> {
    const slide = await this.findSlideOrFail(slideId);
    this.checkOwnership(slide, userId);

    const image = await this.portalSlideImageRepository.findOne({
      where: { id: imageId, slideId },
    });
    if (!image) {
      throw new NotFoundException('Slide image not found');
    }

    await this.portalSlideImageRepository.delete(imageId);
  }

  private async findSlideOrFail(id: string): Promise<PortalSlide> {
    const slide = await this.portalSlideRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!slide) {
      throw new NotFoundException('Portal slide not found');
    }
    return slide;
  }

  // ========== Portal Narrative ==========

  async getNarrative(userId: string): Promise<PortalNarrative | null> {
    return this.portalNarrativeRepository.findOne({ where: { userId } });
  }

  async upsertNarrative(
    userId: string,
    dto: UpdatePortalNarrativeDto,
  ): Promise<PortalNarrative> {
    let narrative = await this.portalNarrativeRepository.findOne({
      where: { userId },
    });

    if (narrative) {
      narrative.text = dto.text;
    } else {
      narrative = this.portalNarrativeRepository.create({
        userId,
        text: dto.text,
      });
    }

    return this.portalNarrativeRepository.save(narrative);
  }

  // ========== Get All (Convenience endpoint) ==========

  async getPortal(userId: string) {
    const [moodBoard, beliefs, slides, narrative] = await Promise.all([
      this.getMoodBoard(userId),
      this.getBeliefs(userId),
      this.getSlides(userId),
      this.getNarrative(userId),
    ]);

    // Sort slides images by order
    slides.forEach((slide) => {
      if (slide.images) {
        slide.images.sort((a, b) => a.order - b.order);
      }
    });

    return {
      moodBoard,
      beliefs,
      slides,
      narrative,
    };
  }

  // ========== Helpers ==========

  private checkOwnership(entity: { userId: string }, userId: string): void {
    if (entity.userId !== userId) {
      throw new ForbiddenException('You do not have access to this resource');
    }
  }
}
