import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortalController } from './portal.controller';
import { PortalService } from './portal.service';
import {
  MoodBoardImage,
  KeyBelief,
  PortalSlide,
  PortalSlideImage,
  PortalNarrative,
} from './entities';

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
