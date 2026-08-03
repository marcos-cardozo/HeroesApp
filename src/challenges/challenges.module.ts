import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesService } from './challenges.service';
import { ChallengesController } from './challenges.controller';
import { Challenge } from './entities/challenge.entity';
import { ChecklistSection } from './entities/checklist-section.entity';
import { ChecklistItem } from './entities/checklist-item.entity';
import { UserChecklistProgress } from './entities/user-checklist-progress.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      ChecklistSection,
      ChecklistItem,
      UserChecklistProgress,
    ]),
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
  exports: [ChallengesService],
})
export class ChallengesModule {}
