import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { CalendarEvent, EventType } from './entities/calendar-event.entity';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { HabitsService } from '../habits/habits.service';
import { calculatePeriod, groupByPeriod, Period } from './utils/period.helper';

export interface CalendarEventWithPeriod extends CalendarEvent {
  period: Period;
}

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(CalendarEvent)
    private calendarRepository: Repository<CalendarEvent>,
    private habitsService: HabitsService,
  ) {}

  async create(
    userId: string,
    dto: CreateCalendarEventDto,
  ): Promise<CalendarEventWithPeriod> {
    this.validateTimeRange(dto.startTime, dto.endTime);

    const event = this.calendarRepository.create({
      ...dto,
      userId,
      type: EventType.EVENT,
    });

    const saved = await this.calendarRepository.save(event);
    return this.addPeriodToEvent(saved);
  }

  async findByDateRange(
    userId: string,
    from: string,
    to: string,
  ): Promise<CalendarEventWithPeriod[]> {
    const manualEvents = await this.calendarRepository.find({
      where: {
        userId,
        date: Between(from, to),
      },
      order: { startTime: 'ASC' },
    });

    const habitEvents = await this.expandHabitsAsEvents(userId, from, to);

    const allEvents = [...manualEvents, ...habitEvents];
    return allEvents.map((e) => this.addPeriodToEvent(e));
  }

  async findByDate(userId: string, date: string): Promise<CalendarEventWithPeriod[]> {
    return this.findByDateRange(userId, date, date);
  }

  async findToday(userId: string): Promise<CalendarEventWithPeriod[]> {
    const today = this.getTodayDate();
    return this.findByDateRange(userId, today, today);
  }

  async findOne(id: string, userId: string): Promise<CalendarEventWithPeriod> {
    const event = await this.calendarRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException('Evento no encontrado');
    }

    if (event.userId !== userId) {
      throw new ForbiddenException('No tienes acceso a este evento');
    }

    return this.addPeriodToEvent(event);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateCalendarEventDto,
  ): Promise<CalendarEventWithPeriod> {
    const event = await this.findOne(id, userId);

    if (event.type === EventType.HABIT) {
      throw new BadRequestException('No se pueden editar eventos de hábitos');
    }

    if (dto.startTime || dto.endTime) {
      const startTime = dto.startTime || event.startTime;
      const endTime = dto.endTime !== undefined ? dto.endTime : event.endTime;
      this.validateTimeRange(startTime, endTime);
    }

    Object.assign(event, dto);
    const updated = await this.calendarRepository.save(event);
    return this.addPeriodToEvent(updated);
  }

  async delete(id: string, userId: string): Promise<void> {
    const event = await this.findOne(id, userId);

    if (event.type === EventType.HABIT) {
      throw new BadRequestException('No se pueden eliminar eventos de hábitos');
    }

    await this.calendarRepository.remove(event);
  }

  async toggleComplete(id: string, userId: string): Promise<CalendarEventWithPeriod> {
    const event = await this.findOne(id, userId);

    if (event.type === EventType.HABIT) {
      throw new BadRequestException('No se puede marcar como completado un evento de hábito');
    }

    event.completed = !event.completed;
    const updated = await this.calendarRepository.save(event);
    return this.addPeriodToEvent(updated);
  }

  async getDayGrouped(userId: string, date: string): Promise<Record<Period, CalendarEventWithPeriod[]>> {
    const events = await this.findByDate(userId, date);
    return groupByPeriod(events);
  }

  async getTodayGrouped(userId: string): Promise<Record<Period, CalendarEventWithPeriod[]>> {
    const events = await this.findToday(userId);
    return groupByPeriod(events);
  }

  private async expandHabitsAsEvents(
    userId: string,
    from: string,
    to: string,
  ): Promise<CalendarEvent[]> {
    const habits = await this.habitsService.findAllActiveByUser(userId);
    const events: CalendarEvent[] = [];
    const dates = this.getDateRange(from, to);

    for (const habit of habits) {
      for (const date of dates) {
        events.push({
          id: `habit-${habit.id}-${date}`,
          userId: habit.userId,
          title: habit.name,
          description: undefined,
          date,
          startTime: '09:00',
          endTime: undefined,
          type: EventType.HABIT,
          relatedHabitId: habit.id,
          isRecurring: true,
          recurrenceRule: undefined,
          completed: false,
          createdAt: habit.createdAt,
        } as unknown as CalendarEvent);
      }
    }

    return events;
  }

  private getDateRange(from: string, to: string): string[] {
    const dates: string[] = [];
    const current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  private addPeriodToEvent(event: CalendarEvent): CalendarEventWithPeriod {
    return {
      ...event,
      period: calculatePeriod(event.startTime),
    };
  }

  private validateTimeRange(startTime: string, endTime?: string): void {
    if (!endTime) return;

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      throw new BadRequestException('La hora de fin debe ser posterior a la hora de inicio');
    }
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
