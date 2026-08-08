import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarService } from './calendar.service';
import { CalendarEvent, EventType } from './entities/calendar-event.entity';
import { HabitsService } from '../habits/habits.service';
import { calculatePeriod, groupByPeriod, Period } from './utils/period.helper';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('Period Helper', () => {
  describe('calculatePeriod', () => {
    it('should return MORNING for times before 12:00', () => {
      expect(calculatePeriod('06:00')).toBe(Period.MORNING);
      expect(calculatePeriod('08:30')).toBe(Period.MORNING);
      expect(calculatePeriod('11:59')).toBe(Period.MORNING);
    });

    it('should return MORNING for exactly 00:00', () => {
      expect(calculatePeriod('00:00')).toBe(Period.MORNING);
    });

    it('should return AFTERNOON for times from 12:00 to 17:59', () => {
      expect(calculatePeriod('12:00')).toBe(Period.AFTERNOON);
      expect(calculatePeriod('14:30')).toBe(Period.AFTERNOON);
      expect(calculatePeriod('17:59')).toBe(Period.AFTERNOON);
    });

    it('should return EVENING for times from 18:00 onwards', () => {
      expect(calculatePeriod('18:00')).toBe(Period.EVENING);
      expect(calculatePeriod('19:30')).toBe(Period.EVENING);
      expect(calculatePeriod('23:59')).toBe(Period.EVENING);
    });

    it('should handle times with seconds', () => {
      expect(calculatePeriod('11:59:59')).toBe(Period.MORNING);
      expect(calculatePeriod('12:00:00')).toBe(Period.AFTERNOON);
      expect(calculatePeriod('18:00:00')).toBe(Period.EVENING);
    });
  });

  describe('groupByPeriod', () => {
    it('should group events by period', () => {
      const events = [
        { startTime: '08:00', title: 'Morning Event' },
        { startTime: '14:00', title: 'Afternoon Event' },
        { startTime: '20:00', title: 'Evening Event' },
      ] as any[];

      const grouped = groupByPeriod(events);

      expect(grouped[Period.MORNING]).toHaveLength(1);
      expect(grouped[Period.MORNING][0].title).toBe('Morning Event');
      expect(grouped[Period.AFTERNOON]).toHaveLength(1);
      expect(grouped[Period.AFTERNOON][0].title).toBe('Afternoon Event');
      expect(grouped[Period.EVENING]).toHaveLength(1);
      expect(grouped[Period.EVENING][0].title).toBe('Evening Event');
    });

    it('should handle empty array', () => {
      const grouped = groupByPeriod([]);
      
      expect(grouped[Period.MORNING]).toHaveLength(0);
      expect(grouped[Period.AFTERNOON]).toHaveLength(0);
      expect(grouped[Period.EVENING]).toHaveLength(0);
    });

    it('should handle multiple events in same period', () => {
      const events = [
        { startTime: '08:00', title: 'Morning 1' },
        { startTime: '09:00', title: 'Morning 2' },
        { startTime: '10:00', title: 'Morning 3' },
      ] as any[];

      const grouped = groupByPeriod(events);

      expect(grouped[Period.MORNING]).toHaveLength(3);
      expect(grouped[Period.AFTERNOON]).toHaveLength(0);
      expect(grouped[Period.EVENING]).toHaveLength(0);
    });
  });
});

describe('CalendarService', () => {
  let service: CalendarService;
  let calendarRepository: jest.Mocked<Repository<CalendarEvent>>;
  let habitsService: jest.Mocked<HabitsService>;

  const mockCalendarRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  const mockHabitsService = {
    findAllActiveByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarService,
        {
          provide: getRepositoryToken(CalendarEvent),
          useValue: mockCalendarRepository,
        },
        {
          provide: HabitsService,
          useValue: mockHabitsService,
        },
      ],
    }).compile();

    service = module.get<CalendarService>(CalendarService);
    calendarRepository = module.get(getRepositoryToken(CalendarEvent));
    habitsService = module.get(HabitsService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a calendar event', async () => {
      const userId = 'user-1';
      const dto = {
        title: 'Reunión',
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '11:00',
      };

      const createdEvent = { id: 'event-1', ...dto, userId, type: EventType.EVENT, completed: false };

      mockCalendarRepository.create.mockReturnValue(createdEvent as any);
      mockCalendarRepository.save.mockResolvedValue(createdEvent as any);

      const result = await service.create(userId, dto);

      expect(result.title).toBe('Reunión');
      expect(result.period).toBe(Period.MORNING);
    });

    it('should throw BadRequestException if endTime is before startTime', async () => {
      const dto = {
        title: 'Reunión',
        date: '2024-01-15',
        startTime: '14:00',
        endTime: '10:00',
      };

      await expect(service.create('user-1', dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if event does not exist', async () => {
      mockCalendarRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent', 'user-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user does not own the event', async () => {
      mockCalendarRepository.findOne.mockResolvedValue({ id: 'event-1', userId: 'other-user' } as any);

      await expect(service.findOne('event-1', 'user-1')).rejects.toThrow(ForbiddenException);
    });

    it('should return event with period', async () => {
      const event = { id: 'event-1', userId: 'user-1', startTime: '14:00' };
      mockCalendarRepository.findOne.mockResolvedValue(event as any);

      const result = await service.findOne('event-1', 'user-1');

      expect(result.period).toBe(Period.AFTERNOON);
    });
  });

  describe('findByDateRange', () => {
    it('should combine manual events with expanded habits', async () => {
      const userId = 'user-1';
      const manualEvent = { id: 'event-1', userId, startTime: '10:00', type: EventType.EVENT };
      const habit = { id: 'habit-1', userId, name: 'Exercise', active: true };

      mockCalendarRepository.find.mockResolvedValue([manualEvent] as any);
      mockHabitsService.findAllActiveByUser.mockResolvedValue([habit] as any);

      const result = await service.findByDateRange(userId, '2024-01-15', '2024-01-15');

      expect(result).toHaveLength(2);
      // Manual events come first, then habits
      expect(result[0].title).toBe(undefined); // manual event has no title property in mock
      expect(result[1].title).toBe('Exercise');
      expect(result[1].type).toBe(EventType.HABIT);
    });
  });

  describe('update', () => {
    it('should throw BadRequestException when updating habit event', async () => {
      const habitEvent = {
        id: 'event-1',
        userId: 'user-1',
        type: EventType.HABIT,
        startTime: '09:00',
      };

      mockCalendarRepository.findOne.mockResolvedValue(habitEvent as any);

      await expect(service.update('event-1', 'user-1', { title: 'New' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    it('should throw BadRequestException when deleting habit event', async () => {
      const habitEvent = {
        id: 'event-1',
        userId: 'user-1',
        type: EventType.HABIT,
        startTime: '09:00',
      };

      mockCalendarRepository.findOne.mockResolvedValue(habitEvent as any);

      await expect(service.delete('event-1', 'user-1')).rejects.toThrow(BadRequestException);
    });
  });

  describe('toggleComplete', () => {
    it('should toggle completed status', async () => {
      const event = {
        id: 'event-1',
        userId: 'user-1',
        type: EventType.EVENT,
        completed: false,
        startTime: '10:00',
        save: jest.fn(),
      };

      mockCalendarRepository.findOne.mockResolvedValue(event as any);
      mockCalendarRepository.save.mockImplementation((e) => Promise.resolve(e as any));

      const result = await service.toggleComplete('event-1', 'user-1');

      expect(result.completed).toBe(true);
    });
  });
});
