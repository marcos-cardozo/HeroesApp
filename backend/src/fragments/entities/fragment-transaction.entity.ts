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

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer' })
  amount: number;

  @Column({
    name: 'reason',
    type: 'enum',
    enum: FragmentReason,
    default: FragmentReason.BOSS_DEFEATED,
  })
  reason: FragmentReason;

  @Column({ name: 'related_boss_id', type: 'uuid', nullable: true })
  relatedBossId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
