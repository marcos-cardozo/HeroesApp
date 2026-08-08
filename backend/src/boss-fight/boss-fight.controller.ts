import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { IsInt, Min } from 'class-validator';
import { BossFightService } from './boss-fight.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

class AnswerDto {
  @IsInt()
  @Min(0)
  selectedOptionIndex: number;
}

@Controller('boss-fights')
@UseGuards(JwtAuthGuard)
export class BossFightController {
  constructor(private readonly bossFightService: BossFightService) {}

  @Get()
  findAll(@Request() req: RequestWithUser) {
    return this.bossFightService.findAllForUser(req.user.id);
  }

  @Get(':slug')
  findBySlug(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
  ) {
    return this.bossFightService.findBySlug(slug, req.user.id);
  }

  @Post(':slug/start')
  @HttpCode(HttpStatus.OK)
  startAttempt(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
  ) {
    return this.bossFightService.startAttempt(slug, req.user.id);
  }

  @Get('attempts/:attemptId/current-question')
  getCurrentQuestion(
    @Request() req: RequestWithUser,
    @Param('attemptId') attemptId: string,
  ) {
    return this.bossFightService.getCurrentQuestion(attemptId, req.user.id);
  }

  @Post('attempts/:attemptId/answer')
  @HttpCode(HttpStatus.OK)
  answerQuestion(
    @Request() req: RequestWithUser,
    @Param('attemptId') attemptId: string,
    @Body() answerDto: AnswerDto,
  ) {
    return this.bossFightService.answerQuestion(
      attemptId,
      answerDto.selectedOptionIndex,
      req.user.id,
    );
  }

  @Post(':slug/retry')
  @HttpCode(HttpStatus.OK)
  retryAttempt(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
  ) {
    return this.bossFightService.retryAttempt(slug, req.user.id);
  }
}
