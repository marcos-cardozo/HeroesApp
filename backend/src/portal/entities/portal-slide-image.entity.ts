import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PortalSlide } from './portal-slide.entity';

// Imagen perteneciente a una diapositiva del portal (máximo 4 por slide)
@Entity('portal_slide_images')
export class PortalSlideImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'slide_id' })
  slideId!: string;

  @ManyToOne(() => PortalSlide, (slide) => slide.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'slide_id' })
  slide!: PortalSlide;

  @Column({ name: 'image_url', type: 'varchar' })
  imageUrl!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;
}
