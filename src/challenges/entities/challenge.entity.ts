import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ChecklistSection } from './checklist-section.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'duration_days', nullable: true })
  durationDays: number;

  @Column({ name: 'total_tasks', default: 0 })
  totalTasks: number;

  @Column({ default: 0 })
  order: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => ChecklistSection, (section) => section.challenge)
  sections: ChecklistSection[];
}
