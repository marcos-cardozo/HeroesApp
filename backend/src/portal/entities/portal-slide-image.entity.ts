import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PortalSlide } from './portal-slide.entity';

@Entity('portal_slide_images')
export class PortalSlideImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'slide_id', type: 'varchar' })
  slideId: string;

  @ManyToOne(() => PortalSlide, (slide) => slide.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'slide_id' })
  slide: PortalSlide;

  @Column({ name: 'image_url', type: 'varchar' })
  imageUrl: string;

  @Column({ type: 'integer', default: 0 })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
