import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Boss } from './entities/boss.entity';
import { BossQuestion } from './entities/boss-question.entity';
import { UserBossAttempt, AttemptStatus } from './entities/user-boss-attempt.entity';
import { UserBossAnswer } from './entities/user-boss-answer.entity';
import { UserBossDefeat } from './entities/user-boss-defeat.entity';
import { Challenge } from '../challenges/entities/challenge.entity';
import { ChallengesService } from '../challenges/challenges.service';
import { FragmentsService } from '../fragments/fragments.service';

export interface BossWithStatus {
  id: string;
  challengeSlug: string;
  name: string;
  description: string;
  totalQuestions: number;
  maxFails: number;
  order: number;
  unlocked: boolean;
  defeated: boolean;
}

export interface BossListResponse {
  bosses: BossWithStatus[];
  totalDefeated: number;
  totalBosses: number;
}

export interface BossDetailResponse {
  id: string;
  name: string;
  description: string;
  totalQuestions: number;
  maxFails: number;
  unlocked: boolean;
  defeated: boolean;
  tasksRemaining?: number;
}

export interface StartAttemptResponse {
  attemptId: string;
  question: QuestionDto;
  totalQuestions: number;
  currentIndex: number;
  failCount: number;
  maxFails: number;
}

export interface QuestionDto {
  id: string;
  text: string;
  options: string[];
  order: number;
}

export interface CurrentQuestionResponse {
  type: 'QUESTION';
  attemptId: string;
  question: QuestionDto;
  currentIndex: number;
  totalQuestions: number;
  failCount: number;
  maxFails: number;
}

export interface AttemptResultResponse {
  type: 'RESULT';
  attemptId: string;
  status: AttemptStatus;
  totalQuestions: number;
  failCount: number;
  correctCount: number;
}

export interface AnswerResponse {
  type: 'QUESTION' | 'RESULT';
  attemptId: string;
  wasCorrect?: boolean;
  question?: QuestionDto;
  currentIndex?: number;
  failCount?: number;
  maxFails: number;
  totalQuestions: number;
  status?: AttemptStatus;
  correctCount?: number;
  fragmentsEarned?: number;
}

@Injectable()
export class BossFightService {
  constructor(
    @InjectRepository(Boss)
    private bossRepository: Repository<Boss>,
    @InjectRepository(BossQuestion)
    private questionRepository: Repository<BossQuestion>,
    @InjectRepository(UserBossAttempt)
    private attemptRepository: Repository<UserBossAttempt>,
    @InjectRepository(UserBossAnswer)
    private answerRepository: Repository<UserBossAnswer>,
    @InjectRepository(UserBossDefeat)
    private defeatRepository: Repository<UserBossDefeat>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    private challengesService: ChallengesService,
    private fragmentsService: FragmentsService,
    private dataSource: DataSource,
  ) {}

  async findAllForUser(userId: string): Promise<BossListResponse> {
    const bosses = await this.bossRepository.find({
      relations: ['challenge'],
      order: { order: 'ASC' },
    });

    const defeats = await this.defeatRepository.find({ where: { userId } });
    const defeatedBossIds = new Set(defeats.map((d) => d.bossId));

    const bossesWithStatus: BossWithStatus[] = await Promise.all(
      bosses.map(async (boss) => {
        const challengeProgress = await this.getChallengeProgress(boss.challenge.slug, userId);
        return {
          id: boss.id,
          challengeSlug: boss.challenge.slug,
          name: boss.name,
          description: boss.description,
          totalQuestions: boss.totalQuestions,
          maxFails: boss.maxFails,
          order: boss.order,
          unlocked: challengeProgress.percentage === 100,
          defeated: defeatedBossIds.has(boss.id),
        };
      }),
    );

    return {
      bosses: bossesWithStatus,
      totalDefeated: defeatedBossIds.size,
      totalBosses: bosses.length,
    };
  }

  async findBySlug(
    slug: string,
    userId: string,
  ): Promise<BossDetailResponse> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const boss = await this.bossRepository.findOne({
      where: { challengeId: challenge.id },
    });

    if (!boss) {
      throw new NotFoundException('Boss no encontrado');
    }

    const challengeProgress = await this.getChallengeProgress(slug, userId);
    const defeated = await this.defeatRepository.findOne({
      where: { userId, bossId: boss.id },
    });

    if (challengeProgress.percentage < 100) {
      return {
        id: boss.id,
        name: boss.name,
        description: boss.description,
        totalQuestions: boss.totalQuestions,
        maxFails: boss.maxFails,
        unlocked: false,
        defeated: !!defeated,
        tasksRemaining: challengeProgress.total - challengeProgress.completed,
      };
    }

    return {
      id: boss.id,
      name: boss.name,
      description: boss.description,
      totalQuestions: boss.totalQuestions,
      maxFails: boss.maxFails,
      unlocked: true,
      defeated: !!defeated,
    };
  }

  async startAttempt(
    slug: string,
    userId: string,
  ): Promise<StartAttemptResponse> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const boss = await this.bossRepository.findOne({
      where: { challengeId: challenge.id },
      relations: ['questions'],
    });

    if (!boss) {
      throw new NotFoundException('Boss no encontrado');
    }

    const challengeProgress = await this.getChallengeProgress(slug, userId);
    if (challengeProgress.percentage < 100) {
      throw new ForbiddenException(
        `Completa el ${challengeProgress.percentage}% del challenge. Te faltan ${challengeProgress.total - challengeProgress.completed} tareas.`,
      );
    }

    const existingInProgress = await this.attemptRepository.findOne({
      where: { userId, bossId: boss.id, status: AttemptStatus.IN_PROGRESS },
      relations: ['boss', 'boss.questions'],
    });

    if (existingInProgress) {
      const sortedQuestions = boss.questions.sort((a, b) => a.order - b.order);
      const question = sortedQuestions[existingInProgress.currentQuestionIndex];
      if (!question) {
        throw new BadRequestException('No hay más preguntas disponibles');
      }
      return {
        attemptId: existingInProgress.id,
        question: this.toQuestionDto(question),
        totalQuestions: boss.totalQuestions,
        currentIndex: existingInProgress.currentQuestionIndex,
        failCount: existingInProgress.failCount,
        maxFails: boss.maxFails,
      };
    }

    const sortedQuestions = boss.questions.sort((a, b) => a.order - b.order);
    if (sortedQuestions.length === 0) {
      throw new BadRequestException('Este boss no tiene preguntas configuradas');
    }

    const attempt = this.attemptRepository.create({
      userId,
      bossId: boss.id,
      status: AttemptStatus.IN_PROGRESS,
      currentQuestionIndex: 0,
      failCount: 0,
    });
    await this.attemptRepository.save(attempt);

    return {
      attemptId: attempt.id,
      question: this.toQuestionDto(sortedQuestions[0]),
      totalQuestions: boss.totalQuestions,
      currentIndex: 0,
      failCount: 0,
      maxFails: boss.maxFails,
    };
  }

  async getCurrentQuestion(
    attemptId: string,
    userId: string,
  ): Promise<CurrentQuestionResponse | AttemptResultResponse> {
    const attempt = await this.attemptRepository.findOne({
      where: { id: attemptId },
      relations: ['boss', 'boss.questions'],
    });

    if (!attempt) {
      throw new NotFoundException('Intento no encontrado');
    }

    if (attempt.userId !== userId) {
      throw new ForbiddenException('Este intento no te pertenece');
    }

    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      const correctCount = await this.answerRepository.count({
        where: { attemptId, wasCorrect: true },
      });
      return {
        type: 'RESULT',
        attemptId: attempt.id,
        status: attempt.status,
        totalQuestions: attempt.boss.totalQuestions,
        failCount: attempt.failCount,
        correctCount,
      };
    }

    const sortedQuestions = attempt.boss.questions.sort((a, b) => a.order - b.order);
    const question = sortedQuestions[attempt.currentQuestionIndex];

    if (!question) {
      throw new BadRequestException('No hay más preguntas disponibles');
    }

    return {
      type: 'QUESTION',
      attemptId: attempt.id,
      question: this.toQuestionDto(question),
      currentIndex: attempt.currentQuestionIndex,
      totalQuestions: attempt.boss.totalQuestions,
      failCount: attempt.failCount,
      maxFails: attempt.boss.maxFails,
    };
  }

  async answerQuestion(
    attemptId: string,
    selectedOptionIndex: number,
    userId: string,
  ): Promise<AnswerResponse> {
    const attempt = await this.attemptRepository.findOne({
      where: { id: attemptId },
      relations: ['boss', 'boss.questions'],
    });

    if (!attempt) {
      throw new NotFoundException('Intento no encontrado');
    }

    if (attempt.userId !== userId) {
      throw new ForbiddenException('Este intento no te pertenece');
    }

    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new BadRequestException('Este intento ya terminó');
    }

    const sortedQuestions = attempt.boss.questions.sort((a, b) => a.order - b.order);
    const currentQuestion = sortedQuestions[attempt.currentQuestionIndex];

    if (!currentQuestion) {
      throw new BadRequestException('No hay más preguntas disponibles');
    }

    const wasCorrect = selectedOptionIndex === currentQuestion.correctOptionIndex;

    await this.answerRepository.save({
      attemptId: attempt.id,
      questionId: currentQuestion.id,
      selectedOptionIndex,
      wasCorrect,
    });

    if (wasCorrect) {
      attempt.currentQuestionIndex += 1;

      if (attempt.currentQuestionIndex >= sortedQuestions.length) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
          attempt.status = AttemptStatus.WON;
          attempt.finishedAt = new Date();
          await queryRunner.manager.save(attempt);

          await queryRunner.manager.save(UserBossDefeat, {
            userId,
            bossId: attempt.bossId,
          });

          await this.fragmentsService.awardFragmentsTransactional(
            queryRunner,
            userId,
            attempt.bossId,
            attempt.boss.rewardFragments,
          );

          await queryRunner.commitTransaction();
        } catch (error) {
          await queryRunner.rollbackTransaction();
          throw error;
        } finally {
          await queryRunner.release();
        }

        const correctCount = await this.answerRepository.count({
          where: { attemptId, wasCorrect: true },
        });

        return {
          type: 'RESULT',
          attemptId: attempt.id,
          wasCorrect: true,
          status: AttemptStatus.WON,
          maxFails: attempt.boss.maxFails,
          totalQuestions: attempt.boss.totalQuestions,
          correctCount,
          fragmentsEarned: attempt.boss.rewardFragments,
        };
      }

      await this.attemptRepository.save(attempt);

      const nextQuestion = sortedQuestions[attempt.currentQuestionIndex];
      return {
        type: 'QUESTION',
        attemptId: attempt.id,
        wasCorrect: true,
        question: this.toQuestionDto(nextQuestion),
        currentIndex: attempt.currentQuestionIndex,
        failCount: attempt.failCount,
        maxFails: attempt.boss.maxFails,
        totalQuestions: attempt.boss.totalQuestions,
      };
    } else {
      attempt.failCount += 1;

      if (attempt.failCount > attempt.boss.maxFails) {
        attempt.status = AttemptStatus.LOST;
        attempt.finishedAt = new Date();
        await this.attemptRepository.save(attempt);

        const correctCount = await this.answerRepository.count({
          where: { attemptId, wasCorrect: true },
        });

        return {
          type: 'RESULT',
          attemptId: attempt.id,
          wasCorrect: false,
          status: AttemptStatus.LOST,
          failCount: attempt.failCount,
          maxFails: attempt.boss.maxFails,
          totalQuestions: attempt.boss.totalQuestions,
          correctCount,
        };
      }

      attempt.currentQuestionIndex += 1;

      if (attempt.currentQuestionIndex >= sortedQuestions.length) {
        attempt.status = AttemptStatus.WON;
        attempt.finishedAt = new Date();
        await this.attemptRepository.save(attempt);

        await this.defeatRepository.save({
          userId,
          bossId: attempt.bossId,
        });

        const correctCount = await this.answerRepository.count({
          where: { attemptId, wasCorrect: true },
        });

        return {
          type: 'RESULT',
          attemptId: attempt.id,
          wasCorrect: false,
          status: AttemptStatus.WON,
          failCount: attempt.failCount,
          maxFails: attempt.boss.maxFails,
          totalQuestions: attempt.boss.totalQuestions,
          correctCount,
        };
      }

      await this.attemptRepository.save(attempt);

      const nextQuestion = sortedQuestions[attempt.currentQuestionIndex];
      return {
        type: 'QUESTION',
        attemptId: attempt.id,
        wasCorrect: false,
        question: this.toQuestionDto(nextQuestion),
        currentIndex: attempt.currentQuestionIndex,
        failCount: attempt.failCount,
        maxFails: attempt.boss.maxFails,
        totalQuestions: attempt.boss.totalQuestions,
      };
    }
  }

  async retryAttempt(slug: string, userId: string): Promise<StartAttemptResponse> {
    const challenge = await this.challengeRepository.findOne({
      where: { slug, active: true },
    });

    if (!challenge) {
      throw new NotFoundException('Challenge no encontrado');
    }

    const boss = await this.bossRepository.findOne({
      where: { challengeId: challenge.id },
      relations: ['questions'],
    });

    if (!boss) {
      throw new NotFoundException('Boss no encontrado');
    }

    const challengeProgress = await this.getChallengeProgress(slug, userId);
    if (challengeProgress.percentage < 100) {
      throw new ForbiddenException('Completa el challenge primero');
    }

    const defeated = await this.defeatRepository.findOne({
      where: { userId, bossId: boss.id },
    });

    if (defeated) {
      throw new BadRequestException('Ya derrotaste a este boss');
    }

    // Limpiar cualquier intento anterior (IN_PROGRESS o LOST) para permitir reintentar
    await this.attemptRepository.delete({
      userId,
      bossId: boss.id,
    });

    const sortedQuestions = boss.questions.sort((a, b) => a.order - b.order);
    if (sortedQuestions.length === 0) {
      throw new BadRequestException('Este boss no tiene preguntas');
    }

    const attempt = this.attemptRepository.create({
      userId,
      bossId: boss.id,
      status: AttemptStatus.IN_PROGRESS,
      currentQuestionIndex: 0,
      failCount: 0,
    });
    await this.attemptRepository.save(attempt);

    return {
      attemptId: attempt.id,
      question: this.toQuestionDto(sortedQuestions[0]),
      totalQuestions: boss.totalQuestions,
      currentIndex: 0,
      failCount: 0,
      maxFails: boss.maxFails,
    };
  }

  private async getChallengeProgress(
    slug: string,
    userId: string,
  ): Promise<{ completed: number; total: number; percentage: number }> {
    try {
      const detail = await this.challengesService.findBySlug(slug, userId);
      return detail.progress;
    } catch {
      return { completed: 0, total: 0, percentage: 0 };
    }
  }

  private toQuestionDto(question: BossQuestion): QuestionDto {
    return {
      id: question.id,
      text: question.text,
      options: question.options,
      order: question.order,
    };
  }
}
