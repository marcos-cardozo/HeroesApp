import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Boss } from './boss.entity';
import { UserBossAnswer } from './user-boss-answer.entity';

export enum AttemptStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  WON = 'WON',
  LOST = 'LOST',
}

@Entity('user_boss_attempts')
export class UserBossAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'boss_id' })
  bossId: string;

  @ManyToOne(() => Boss, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boss_id' })
  boss: Boss;

  @Column({
    type: 'enum',
    enum: AttemptStatus,
    default: AttemptStatus.IN_PROGRESS,
  })
  status: AttemptStatus;

  @Column({ name: 'current_question_index', default: 0 })
  currentQuestionIndex: number;

  @Column({ name: 'fail_count', default: 0 })
  failCount: number;

  @CreateDateColumn({ name: 'started_at' })
  startedAt: Date;

  @Column({ name: 'finished_at', nullable: true })
  finishedAt: Date;

  @OneToMany(() => UserBossAnswer, (answer) => answer.attempt)
  answers: UserBossAnswer[];
}
