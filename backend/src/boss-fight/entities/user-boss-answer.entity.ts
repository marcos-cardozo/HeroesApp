import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserBossAttempt } from './user-boss-attempt.entity';
import { BossQuestion } from './boss-question.entity';

@Entity('user_boss_answers')
export class UserBossAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'attempt_id' })
  attemptId: string;

  @ManyToOne(() => UserBossAttempt, (attempt) => attempt.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attempt_id' })
  attempt: UserBossAttempt;

  @Column({ name: 'question_id' })
  questionId: string;

  @ManyToOne(() => BossQuestion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: BossQuestion;

  @Column({ name: 'selected_option_index' })
  selectedOptionIndex: number;

  @Column({ name: 'was_correct' })
  wasCorrect: boolean;

  @CreateDateColumn({ name: 'answered_at' })
  answeredAt: Date;
}
