import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';
import { ChecklistItem } from './checklist-item.entity';

@Entity('checklist_sections')
export class ChecklistSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'challenge_id' })
  challengeId: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'challenge_id' })
  challenge: Challenge;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => ChecklistItem, (item) => item.section)
  items: ChecklistItem[];
}
