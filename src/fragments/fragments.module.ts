import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FragmentsService } from './fragments.service';
import { FragmentsController } from './fragments.controller';
import { FragmentTransaction } from './entities/fragment-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FragmentTransaction]),
  ],
  controllers: [FragmentsController],
  providers: [FragmentsService],
  exports: [FragmentsService],
})
export class FragmentsModule {}
