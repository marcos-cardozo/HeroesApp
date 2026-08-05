import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum FragmentReason {
  BOSS_DEFEATED = 'BOSS_DEFEATED',
  REDEMPTION = 'REDEMPTION',
  ADMIN_ADJUSTMENT = 'ADMIN_ADJUSTMENT',
}

@Entity('fragment_transactions')
export class FragmentTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer' })
  amount: number;

  @Column({
    type: 'enum',
    enum: FragmentReason,
    default: FragmentReason.BOSS_DEFEATED,
  })
  reason: FragmentReason;

  @Column({ name: 'related_boss_id', nullable: true })
  relatedBossId: string | null;

  @Column({ nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
