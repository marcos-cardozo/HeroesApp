import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CalendarService, CalendarEventWithPeriod } from './calendar.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Period } from './utils/period.helper';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

@Controller('calendar')
@UseGuards(JwtAuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('events')
  create(
    @Request() req: RequestWithUser,
    @Body() dto: CreateCalendarEventDto,
  ): Promise<CalendarEventWithPeriod> {
    return this.calendarService.create(req.user.id, dto);
  }

  @Get('events')
  findByRange(
    @Request() req: RequestWithUser,
    @Query('from') from: string,
    @Query('to') to: string,
  ): Promise<CalendarEventWithPeriod[]> {
    return this.calendarService.findByDateRange(req.user.id, from, to);
  }

  @Get('day/:date')
  findByDay(
    @Request() req: RequestWithUser,
    @Param('date') date: string,
  ): Promise<Record<Period, CalendarEventWithPeriod[]>> {
    return this.calendarService.getDayGrouped(req.user.id, date);
  }

  @Get('today')
  findToday(
    @Request() req: RequestWithUser,
  ): Promise<Record<Period, CalendarEventWithPeriod[]>> {
    return this.calendarService.getTodayGrouped(req.user.id);
  }

  @Get('events/:id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string): Promise<CalendarEventWithPeriod> {
    return this.calendarService.findOne(id, req.user.id);
  }

  @Patch('events/:id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateCalendarEventDto,
  ): Promise<CalendarEventWithPeriod> {
    return this.calendarService.update(id, req.user.id, dto);
  }

  @Delete('events/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Request() req: RequestWithUser, @Param('id') id: string): Promise<void> {
    return this.calendarService.delete(id, req.user.id);
  }

  @Patch('events/:id/complete')
  toggleComplete(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ): Promise<CalendarEventWithPeriod> {
    return this.calendarService.toggleComplete(id, req.user.id);
  }
}
