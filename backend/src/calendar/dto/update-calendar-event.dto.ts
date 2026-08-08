import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsDateString,
  Matches,
} from 'class-validator';
import { RecurrenceRule } from '../entities/calendar-event.entity';

export class UpdateCalendarEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString({}, { message: 'La fecha debe tener formato YYYY-MM-DD' })
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
    message: 'La hora de inicio debe tener formato HH:mm o HH:mm:ss',
  })
  startTime?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
    message: 'La hora de fin debe tener formato HH:mm o HH:mm:ss',
  })
  endTime?: string;

  @IsBoolean()
  @IsOptional()
  isRecurring?: boolean;

  @IsEnum(RecurrenceRule)
  @IsOptional()
  recurrenceRule?: RecurrenceRule;
}
