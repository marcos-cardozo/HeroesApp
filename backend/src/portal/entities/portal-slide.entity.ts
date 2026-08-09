import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PortalSlideImage } from './portal-slide-image.entity';

@Entity('portal_slides')
export class PortalSlide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'varchar' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ name: 'narrative_text', type: 'text', nullable: true })
  narrativeText: string;

  @OneToMany(() => PortalSlideImage, (image) => image.slide, { cascade: true })
  images: PortalSlideImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
