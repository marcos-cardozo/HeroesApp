import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Habit } from './habit.entity';

@Entity('habit_logs')
export class HabitLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'habit_id' })
  habitId: string;

  @ManyToOne(() => Habit, (habit) => habit.logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @Column({ type: 'date' })
  date: string;

  @CreateDateColumn({ name: 'completed_at' })
  completedAt: Date;
}
