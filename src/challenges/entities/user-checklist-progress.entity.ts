import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ChecklistItem } from './checklist-item.entity';

@Entity('user_checklist_progress')
@Unique(['userId', 'checklistItemId'])
export class UserChecklistProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'checklist_item_id' })
  checklistItemId: string;

  @ManyToOne(() => ChecklistItem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'checklist_item_id' })
  checklistItem: ChecklistItem;

  @CreateDateColumn({ name: 'completed_at' })
  completedAt: Date;
}
