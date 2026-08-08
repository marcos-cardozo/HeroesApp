import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Boss } from './boss.entity';

@Entity('boss_questions')
export class BossQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'boss_id' })
  bossId: string;

  @ManyToOne(() => Boss, (boss) => boss.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boss_id' })
  boss: Boss;

  @Column()
  text: string;

  @Column({ type: 'jsonb' })
  options: string[];

  @Column({ name: 'correct_option_index' })
  correctOptionIndex: number;

  @Column({ default: 0 })
  order: number;
}
