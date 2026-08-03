import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { ChecklistSection } from './entities/checklist-section.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { UserChecklistProgress } from './entities/user-checklist-progress.entity';

export interface ChallengeWithProgress {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationDays: number;
  totalTasks: number;
  order: number;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
}

export interface ChallengeDetailWithSections {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationDays: number;
  totalTasks: number;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  sections: SectionWithItems[];
}

export interface SectionWithItems {
  id: string;
  title: string;
  order: number;
  progress: {
    completed: number;
    total: number;
  };
  items: ChecklistItemWithStatus[];
}

export interface ChecklistItemWithStatus {
  id: string;
  title: string;
  order: number;
  completed: boolean;
  completedAt: Date | null;
}

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(ChecklistSection)
    private sectionRepository: Repository<ChecklistSection>,
    @InjectRepository(ChecklistItem)
    private itemRepository: Repository<ChecklistItem>,
    @InjectRepository(UserChecklistProgress)
    private progressRepository: Repository<UserChecklistProgress>,
  ) {}

  async findAllForUser(userId: string): Promise<ChallengeWithProgress[]> {
    const challenges = await this.challengeRepository.find({
      where: { active: true },
      order: { order: 'ASC' },
    });

    const progressMap = await this.getProgressMapForUser(userId);

    return challenges.map((challenge) => {
      const itemIds = this.getAllItemIdsFromChallenge(challenge);
      const completed = itemIds.filter((id) => progressMap.has(id)).length;
      const total = challenge.totalTasks || itemIds.length;

      return {
        id: challenge.id,
        slug: challenge.slug,
        name: challenge.name,
        description: challenge.description,
        durationDays: challenge.durationDays,
        totalTasks: total,
        order: challenge.order,
        progress: {
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        },
      };
    });
  }

  async findBySlug(slug: string, userId: string): Promise<ChallengeDetailWithSections> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const sections = await this.sectionRepository.find({
      where: { challengeId: challenge.id },
      relations: ['items'],
      order: { order: 'ASC' },
    });

    const progressMap = await this.getProgressMapForUser(userId);
    const allItemIds = this.getAllItemIdsFromChallenge(challenge);
    const completedCount = allItemIds.filter((id) => progressMap.has(id)).length;

    const sectionsWithItems: SectionWithItems[] = sections.map((section) => {
      const items = section.items.sort((a, b) => a.order - b.order);
      const sectionCompleted = items.filter((item) => progressMap.has(item.id)).length;

      return {
        id: section.id,
        title: section.title,
        order: section.order,
        progress: {
          completed: sectionCompleted,
          total: items.length,
        },
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          order: item.order,
          completed: progressMap.has(item.id),
          completedAt: progressMap.get(item.id) || null,
        })),
      };
    });

    return {
      id: challenge.id,
      slug: challenge.slug,
      name: challenge.name,
      description: challenge.description,
      durationDays: challenge.durationDays,
      totalTasks: challenge.totalTasks || allItemIds.length,
      progress: {
        completed: completedCount,
        total: challenge.totalTasks || allItemIds.length,
        percentage:
          allItemIds.length > 0
            ? Math.round((completedCount / allItemIds.length) * 100)
            : 0,
      },
      sections: sectionsWithItems,
    };
  }

  async completeItem(
    slug: string,
    itemId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['section'],
    });

    if (!item || item.section.challengeId !== challenge.id) {
      throw new NotFoundException('Item no encontrado en este challenge');
    }

    const existing = await this.progressRepository.findOne({
      where: { userId, checklistItemId: itemId },
    });

    if (existing) {
      return { message: 'Item ya estaba completado' };
    }

    await this.progressRepository.save({
      userId,
      checklistItemId: itemId,
    });

    return { message: 'Item marcado como completado' };
  }

  async uncompleteItem(
    slug: string,
    itemId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const item = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: ['section'],
    });

    if (!item || item.section.challengeId !== challenge.id) {
      throw new NotFoundException('Item no encontrado en este challenge');
    }

    await this.progressRepository.delete({ userId, checklistItemId: itemId });

    return { message: 'Completado deshecho' };
  }

  private async getProgressMapForUser(
    userId: string,
  ): Promise<Map<string, Date>> {
    const progress = await this.progressRepository.find({
      where: { userId },
    });

    const map = new Map<string, Date>();
    for (const p of progress) {
      map.set(p.checklistItemId, p.completedAt);
    }
    return map;
  }

  private getAllItemIdsFromChallenge(challenge: Challenge): string[] {
    if (!challenge.sections) {
      return [];
    }
    return challenge.sections.flatMap((section) =>
      (section.items || []).map((item) => item.id),
    );
  }
}
