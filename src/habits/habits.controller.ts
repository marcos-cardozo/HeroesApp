import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

@Controller('habits')
@UseGuards(JwtAuthGuard)
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Request() req: RequestWithUser, @Body() createHabitDto: CreateHabitDto) {
    return this.habitsService.create(req.user.id, createHabitDto);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.habitsService.findAllActiveByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.habitsService.findOneWithRecentLogs(id, req.user.id);
  }

  @Patch(':id')
  update(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ) {
    return this.habitsService.update(id, req.user.id, updateHabitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.habitsService.softDelete(id, req.user.id);
  }

  @Post(':id/complete')
  complete(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.habitsService.complete(id, req.user.id);
  }

  @Delete(':id/complete')
  @HttpCode(HttpStatus.NO_CONTENT)
  uncomplete(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.habitsService.uncomplete(id, req.user.id);
  }
}
