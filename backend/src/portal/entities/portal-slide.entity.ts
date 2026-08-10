import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PortalSlideImage } from './portal-slide-image.entity';

// Diapositiva del portal: hasta 4 imágenes + texto narrativo
@Entity('portal_slides')
export class PortalSlide {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'user_id' })
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @Column({ type: 'varchar', nullable: true })
  title!: string | null;

  @Column({ name: 'narrative_text', type: 'text' })
  narrativeText!: string;

  @OneToMany(() => PortalSlideImage, (image) => image.slide, {
    cascade: true,
  })
  images!: PortalSlideImage[];
}
