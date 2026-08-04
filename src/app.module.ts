import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HabitsModule } from './habits/habits.module';
import { CalendarModule } from './calendar/calendar.module';
import { ChallengesModule } from './challenges/challenges.module';
import { BossFightModule } from './boss-fight/boss-fight.module';
import { User } from './users/entities/user.entity';
import { Habit } from './habits/entities/habit.entity';
import { HabitLog } from './habits/entities/habit-log.entity';
import { CalendarEvent } from './calendar/entities/calendar-event.entity';
import { Challenge } from './challenges/entities/challenge.entity';
import { ChecklistSection } from './challenges/entities/checklist-section.entity';
import { ChecklistItem } from './challenges/entities/checklist-item.entity';
import { UserChecklistProgress } from './challenges/entities/user-checklist-progress.entity';
import { Boss } from './boss-fight/entities/boss.entity';
import { BossQuestion } from './boss-fight/entities/boss-question.entity';
import { UserBossAttempt } from './boss-fight/entities/user-boss-attempt.entity';
import { UserBossAnswer } from './boss-fight/entities/user-boss-answer.entity';
import { UserBossDefeat } from './boss-fight/entities/user-boss-defeat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Habit, HabitLog, CalendarEvent, Challenge, ChecklistSection, ChecklistItem, UserChecklistProgress, Boss, BossQuestion, UserBossAttempt, UserBossAnswer, UserBossDefeat],
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'development',
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    HabitsModule,
    CalendarModule,
    ChallengesModule,
    BossFightModule,
  ],
})
export class AppModule {}
