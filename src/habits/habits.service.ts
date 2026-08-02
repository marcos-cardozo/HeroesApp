import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Habit } from './entities/habit.entity';
import { HabitLog } from './entities/habit-log.entity';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitsRepository: Repository<Habit>,
    @InjectRepository(HabitLog)
    private habitLogsRepository: Repository<HabitLog>,
  ) {}

  async create(userId: string, createHabitDto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitsRepository.create({
      userId,
      name: createHabitDto.name,
      icon: createHabitDto.icon,
      currentStreak: 0,
      longestStreak: 0,
      active: true,
    });

    return this.habitsRepository.save(habit);
  }

  async findAllActiveByUser(userId: string): Promise<Habit[]> {
    return this.habitsRepository.find({
      where: { userId, active: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Habit> {
    const habit = await this.habitsRepository.findOne({
      where: { id },
      relations: ['logs'],
    });

    if (!habit) {
      throw new NotFoundException('Hábito no encontrado');
    }

    if (habit.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a este hábito');
    }

    return habit;
  }

  async findOneWithRecentLogs(
    id: string,
    userId: string,
  ): Promise<Habit & { recentLogs: HabitLog[] }> {
    const habit = await this.findOne(id, userId);

    const thirtyDaysAgo = this.getDateDaysAgo(30);

    const recentLogs = await this.habitLogsRepository.find({
      where: {
        habitId: id,
        date: MoreThanOrEqual(thirtyDaysAgo),
      },
      order: { date: 'DESC' },
    });

    return { ...habit, recentLogs };
  }

  async update(
    id: string,
    userId: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<Habit> {
    const habit = await this.findOne(id, userId);

    if (updateHabitDto.name !== undefined) {
      habit.name = updateHabitDto.name;
    }
    if (updateHabitDto.icon !== undefined) {
      habit.icon = updateHabitDto.icon;
    }

    return this.habitsRepository.save(habit);
  }

  async softDelete(id: string, userId: string): Promise<void> {
    const habit = await this.findOne(id, userId);
    habit.active = false;
    await this.habitsRepository.save(habit);
  }

  async complete(id: string, userId: string): Promise<Habit> {
    const habit = await this.findOne(id, userId);
    const today = this.getTodayDate();

    const existingLog = await this.habitLogsRepository.findOne({
      where: { habitId: id, date: today },
    });

    if (existingLog) {
      throw new BadRequestException('Este hábito ya fue completado hoy');
    }

    await this.habitLogsRepository.save({
      habitId: id,
      date: today,
    });

    const { currentStreak, longestStreak } = this.calculateStreaks(
      habit.userId,
      habit.currentStreak,
      habit.longestStreak,
      today,
      true,
    );

    habit.currentStreak = currentStreak;
    habit.longestStreak = longestStreak;

    return this.habitsRepository.save(habit);
  }

  async uncomplete(id: string, userId: string): Promise<Habit> {
    const habit = await this.findOne(id, userId);
    const today = this.getTodayDate();

    const todayLog = await this.habitLogsRepository.findOne({
      where: { habitId: id, date: today },
    });

    if (!todayLog) {
      throw new BadRequestException('No hay registro para deshacer hoy');
    }

    await this.habitLogsRepository.remove(todayLog);

    const { currentStreak } = this.calculateStreaks(
      habit.userId,
      habit.currentStreak,
      habit.longestStreak,
      today,
      false,
    );

    habit.currentStreak = currentStreak;

    return this.habitsRepository.save(habit);
  }

  calculateStreaks(
    userId: string,
    currentStreak: number,
    longestStreak: number,
    referenceDate: string,
    isCompleting: boolean,
  ): { currentStreak: number; longestStreak: number } {
    if (isCompleting) {
      const newCurrentStreak = currentStreak + 1;
      const newLongestStreak = Math.max(longestStreak, newCurrentStreak);
      return { currentStreak: newCurrentStreak, longestStreak: newLongestStreak };
    } else {
      const newCurrentStreak = Math.max(0, currentStreak - 1);
      return { currentStreak: newCurrentStreak, longestStreak };
    }
  }

  getTodayDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0];
  }

  getDateDaysAgo(days: number): string {
    const date = new Date();
    date.setUTCDate(date.getUTCDate() - days);
    return date.toISOString().split('T')[0];
  }

  getYesterdayDate(): string {
    return this.getDateDaysAgo(1);
  }
}
