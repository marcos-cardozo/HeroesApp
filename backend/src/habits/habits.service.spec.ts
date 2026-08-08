import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitsService } from './habits.service';
import { Habit } from './entities/habit.entity';
import { HabitLog } from './entities/habit-log.entity';
import { NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';

describe('HabitsService', () => {
  let service: HabitsService;
  let habitsRepository: jest.Mocked<Repository<Habit>>;
  let habitLogsRepository: jest.Mocked<Repository<HabitLog>>;

  beforeEach(async () => {
    const mockHabitsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const mockHabitLogsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitsService,
        {
          provide: getRepositoryToken(Habit),
          useValue: mockHabitsRepository,
        },
        {
          provide: getRepositoryToken(HabitLog),
          useValue: mockHabitLogsRepository,
        },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
    habitsRepository = module.get(getRepositoryToken(Habit));
    habitLogsRepository = module.get(getRepositoryToken(HabitLog));
  });

  describe('calculateStreaks', () => {
    it('should increment streak when completing', () => {
      const result = service.calculateStreaks('user-id', 5, 10, '2024-01-15', true);
      expect(result.currentStreak).toBe(6);
      expect(result.longestStreak).toBe(10);
    });

    it('should update longest streak when current exceeds it', () => {
      const result = service.calculateStreaks('user-id', 10, 10, '2024-01-15', true);
      expect(result.currentStreak).toBe(11);
      expect(result.longestStreak).toBe(11);
    });

    it('should decrement streak when uncompletng', () => {
      const result = service.calculateStreaks('user-id', 5, 10, '2024-01-15', false);
      expect(result.currentStreak).toBe(4);
      expect(result.longestStreak).toBe(10);
    });

    it('should not go below 0 when uncompletng', () => {
      const result = service.calculateStreaks('user-id', 0, 5, '2024-01-15', false);
      expect(result.currentStreak).toBe(0);
      expect(result.longestStreak).toBe(5);
    });

    it('should handle first completion (streak from 0)', () => {
      const result = service.calculateStreaks('user-id', 0, 0, '2024-01-15', true);
      expect(result.currentStreak).toBe(1);
      expect(result.longestStreak).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new habit', async () => {
      const userId = 'user-123';
      const dto = { name: 'Meditar', icon: '🧘' };
      const createdHabit = { id: 'habit-1', ...dto, userId, currentStreak: 0, longestStreak: 0, active: true };

      habitsRepository.create.mockReturnValue(createdHabit as any);
      habitsRepository.save.mockResolvedValue(createdHabit as any);

      const result = await service.create(userId, dto);

      expect(habitsRepository.create).toHaveBeenCalledWith({
        userId,
        name: dto.name,
        icon: dto.icon,
        currentStreak: 0,
        longestStreak: 0,
        active: true,
      });
      expect(result).toEqual(createdHabit);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if habit does not exist', async () => {
      habitsRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if habit belongs to another user', async () => {
      habitsRepository.findOne.mockResolvedValue({ id: 'habit-1', userId: 'other-user' } as any);

      await expect(service.findOne('habit-1', 'user-1')).rejects.toThrow(ForbiddenException);
    });

    it('should return habit if user is the owner', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', name: 'Test' };
      habitsRepository.findOne.mockResolvedValue(habit as any);

      const result = await service.findOne('habit-1', 'user-1');

      expect(result).toEqual(habit);
    });
  });

  describe('complete', () => {
    it('should throw BadRequestException if already completed today', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', currentStreak: 5, longestStreak: 10 };
      const today = new Date().toISOString().split('T')[0];

      habitsRepository.findOne.mockResolvedValue(habit as any);
      habitLogsRepository.findOne.mockResolvedValue({ id: 'log-1' } as any);

      await expect(service.complete('habit-1', 'user-1')).rejects.toThrow(BadRequestException);
    });

    it('should complete habit and update streak', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', currentStreak: 5, longestStreak: 10, save: jest.fn() };
      const today = new Date().toISOString().split('T')[0];

      habitsRepository.findOne.mockResolvedValue(habit as any);
      habitLogsRepository.findOne.mockResolvedValue(null);
      habitLogsRepository.save.mockResolvedValue({ id: 'log-1' } as any);
      habitsRepository.save.mockResolvedValue({ ...habit, currentStreak: 6, longestStreak: 10 } as any);

      const result = await service.complete('habit-1', 'user-1');

      expect(habitLogsRepository.save).toHaveBeenCalledWith({ habitId: 'habit-1', date: today });
      expect(result.currentStreak).toBe(6);
    });
  });

  describe('uncomplete', () => {
    it('should throw BadRequestException if no log exists for today', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', currentStreak: 5 };
      const today = new Date().toISOString().split('T')[0];

      habitsRepository.findOne.mockResolvedValue(habit as any);
      habitLogsRepository.findOne.mockResolvedValue(null);

      await expect(service.uncomplete('habit-1', 'user-1')).rejects.toThrow(BadRequestException);
    });

    it('should uncomplete habit and decrease streak', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', currentStreak: 5, longestStreak: 10 };
      const today = new Date().toISOString().split('T')[0];
      const log = { id: 'log-1', habitId: 'habit-1', date: today };

      habitsRepository.findOne.mockResolvedValue(habit as any);
      habitLogsRepository.findOne.mockResolvedValue(log as any);
      habitLogsRepository.remove.mockResolvedValue(log as any);
      habitsRepository.save.mockResolvedValue({ ...habit, currentStreak: 4 } as any);

      const result = await service.uncomplete('habit-1', 'user-1');

      expect(habitLogsRepository.remove).toHaveBeenCalledWith(log);
      expect(result.currentStreak).toBe(4);
    });
  });

  describe('softDelete', () => {
    it('should set active to false', async () => {
      const habit = { id: 'habit-1', userId: 'user-1', active: true, save: jest.fn() };

      habitsRepository.findOne.mockResolvedValue(habit as any);
      habitsRepository.save.mockResolvedValue({ ...habit, active: false } as any);

      await service.softDelete('habit-1', 'user-1');

      expect(habit.active).toBe(false);
      expect(habitsRepository.save).toHaveBeenCalledWith(habit);
    });
  });

  describe('getTodayDate', () => {
    it('should return date in YYYY-MM-DD format', () => {
      const today = service.getTodayDate();
      expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('getDateDaysAgo', () => {
    it('should return correct date 30 days ago', () => {
      const date = service.getDateDaysAgo(30);
      const expected = new Date();
      expected.setUTCDate(expected.getUTCDate() - 30);
      expect(date).toBe(expected.toISOString().split('T')[0]);
    });
  });
});
