import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChallengesService, ChallengeWithProgress, ChallengeDetailWithSections } from './challenges.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

@Controller('challenges')
@UseGuards(JwtAuthGuard)
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  findAll(@Request() req: RequestWithUser): Promise<ChallengeWithProgress[]> {
    return this.challengesService.findAllForUser(req.user.id);
  }

  @Get(':slug')
  findOne(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
  ): Promise<ChallengeDetailWithSections> {
    return this.challengesService.findBySlug(slug, req.user.id);
  }

  @Post(':slug/items/:itemId/complete')
  @HttpCode(HttpStatus.OK)
  completeItem(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
    @Param('itemId') itemId: string,
  ): Promise<{ message: string }> {
    return this.challengesService.completeItem(slug, itemId, req.user.id);
  }

  @Delete(':slug/items/:itemId/complete')
  @HttpCode(HttpStatus.OK)
  uncompleteItem(
    @Request() req: RequestWithUser,
    @Param('slug') slug: string,
    @Param('itemId') itemId: string,
  ): Promise<{ message: string }> {
    return this.challengesService.uncompleteItem(slug, itemId, req.user.id);
  }
}
