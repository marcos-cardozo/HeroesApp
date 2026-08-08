import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ChecklistSection } from './checklist-section.entity';

@Entity('checklist_items')
export class ChecklistItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'section_id' })
  sectionId: string;

  @ManyToOne(() => ChecklistSection, (section) => section.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'section_id' })
  section: ChecklistSection;

  @Column()
  title: string;

  @Column({ default: 0 })
  order: number;
}
