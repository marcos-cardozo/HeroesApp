import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Challenge } from '../../challenges/entities/challenge.entity';
import { BossQuestion } from './boss-question.entity';

@Entity('bosses')
export class Boss {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'challenge_id', unique: true })
  challengeId: string;

  @OneToOne(() => Challenge, { onDelete: 'CASCADE' })
  challenge: Challenge;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'total_questions', default: 0 })
  totalQuestions: number;

  @Column({ name: 'max_fails', default: 3 })
  maxFails: number;

  @Column({ name: 'reward_fragments', default: 10 })
  rewardFragments: number;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => BossQuestion, (question) => question.boss)
  questions: BossQuestion[];
}
