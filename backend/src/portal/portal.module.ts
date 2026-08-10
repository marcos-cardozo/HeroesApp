import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalService } from './portal.service';
import { PortalController } from './portal.controller';
import { MoodBoardImage } from './entities/mood-board-image.entity';
import { KeyBelief } from './entities/key-belief.entity';
import { PortalSlide } from './entities/portal-slide.entity';
import { PortalSlideImage } from './entities/portal-slide-image.entity';
import { PortalNarrative } from './entities/portal-narrative.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MoodBoardImage,
      KeyBelief,
      PortalSlide,
      PortalSlideImage,
      PortalNarrative,
    ]),
  ],
  controllers: [PortalController],
  providers: [PortalService],
  exports: [PortalService],
})
export class PortalModule {}
