import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossFightService } from './boss-fight.service';
import { BossFightController } from './boss-fight.controller';
import { Boss } from './entities/boss.entity';
import { BossQuestion } from './entities/boss-question.entity';
import { UserBossAttempt } from './entities/user-boss-attempt.entity';
import { UserBossAnswer } from './entities/user-boss-answer.entity';
import { UserBossDefeat } from './entities/user-boss-defeat.entity';
import { Challenge } from '../challenges/entities/challenge.entity';
import { ChallengesModule } from '../challenges/challenges.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Boss,
      BossQuestion,
      UserBossAttempt,
      UserBossAnswer,
      UserBossDefeat,
      Challenge,
    ]),
    ChallengesModule,
  ],
  controllers: [BossFightController],
  providers: [BossFightService],
  exports: [BossFightService],
})
export class BossFightModule {}
