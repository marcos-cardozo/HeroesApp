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
import { Boss } from './boss.entity';

@Entity('user_boss_defeats')
@Unique(['userId', 'bossId'])
export class UserBossDefeat {
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

  @CreateDateColumn({ name: 'defeated_at' })
  defeatedAt: Date;
}
