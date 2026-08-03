import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum EventType {
  EVENT = 'event',
  HABIT = 'habit',
  GOAL = 'goal',
}

export enum RecurrenceRule {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  WEEKDAYS = 'WEEKDAYS',
}

@Entity('calendar_events')
export class CalendarEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time', nullable: true })
  endTime: string;

  @Column({
    type: 'enum',
    enum: EventType,
    default: EventType.EVENT,
  })
  type: EventType;

  @Column({ name: 'related_habit_id', nullable: true })
  relatedHabitId: string;

  @Column({ name: 'is_recurring', default: false })
  isRecurring: boolean;

  @Column({
    name: 'recurrence_rule',
    type: 'enum',
    enum: RecurrenceRule,
    nullable: true,
  })
  recurrenceRule: RecurrenceRule;

  @Column({ default: false })
  completed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
