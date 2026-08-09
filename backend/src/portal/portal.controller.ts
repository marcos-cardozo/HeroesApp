import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PortalService } from './portal.service';
import {
  CreateMoodBoardImageDto,
  UpdateMoodBoardImageDto,
  CreateKeyBeliefDto,
  UpdateKeyBeliefDto,
  CreatePortalSlideDto,
  UpdatePortalSlideDto,
  CreateSlideImageDto,
  UpdatePortalNarrativeDto,
} from './dto';

@Controller('portal')
@UseGuards(JwtAuthGuard)
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  // ========== Get All (Convenience endpoint) ==========

  @Get()
  async getPortal(@Request() req: { user: { userId: string } }) {
    return this.portalService.getPortal(req.user.userId);
  }

  // ========== Mood Board ==========

  @Get('mood-board')
  async getMoodBoard(@Request() req: { user: { userId: string } }) {
    return this.portalService.getMoodBoard(req.user.userId);
  }

  @Post('mood-board')
  async createMoodBoardImage(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreateMoodBoardImageDto,
  ) {
    return this.portalService.createMoodBoardImage(req.user.userId, dto);
  }

  @Patch('mood-board/:id')
  async updateMoodBoardImage(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateMoodBoardImageDto,
  ) {
    return this.portalService.updateMoodBoardImage(req.user.userId, id, dto);
  }

  @Delete('mood-board/:id')
  async deleteMoodBoardImage(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    await this.portalService.deleteMoodBoardImage(req.user.userId, id);
    return { message: 'Mood board image deleted' };
  }

  // ========== Key Beliefs ==========

  @Get('beliefs')
  async getBeliefs(@Request() req: { user: { userId: string } }) {
    return this.portalService.getBeliefs(req.user.userId);
  }

  @Post('beliefs')
  async createBelief(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreateKeyBeliefDto,
  ) {
    return this.portalService.createBelief(req.user.userId, dto);
  }

  @Patch('beliefs/:id')
  async updateBelief(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdateKeyBeliefDto,
  ) {
    return this.portalService.updateBelief(req.user.userId, id, dto);
  }

  @Delete('beliefs/:id')
  async deleteBelief(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    await this.portalService.deleteBelief(req.user.userId, id);
    return { message: 'Key belief deleted' };
  }

  // ========== Portal Slides ==========

  @Get('slides')
  async getSlides(@Request() req: { user: { userId: string } }) {
    return this.portalService.getSlides(req.user.userId);
  }

  @Post('slides')
  async createSlide(
    @Request() req: { user: { userId: string } },
    @Body() dto: CreatePortalSlideDto,
  ) {
    return this.portalService.createSlide(req.user.userId, dto);
  }

  @Patch('slides/:id')
  async updateSlide(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() dto: UpdatePortalSlideDto,
  ) {
    return this.portalService.updateSlide(req.user.userId, id, dto);
  }

  @Delete('slides/:id')
  async deleteSlide(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    await this.portalService.deleteSlide(req.user.userId, id);
    return { message: 'Portal slide deleted' };
  }

  @Post('slides/:slideId/images')
  async addSlideImage(
    @Request() req: { user: { userId: string } },
    @Param('slideId') slideId: string,
    @Body() dto: CreateSlideImageDto,
  ) {
    return this.portalService.addSlideImage(req.user.userId, slideId, dto);
  }

  @Delete('slides/:slideId/images/:imageId')
  async deleteSlideImage(
    @Request() req: { user: { userId: string } },
    @Param('slideId') slideId: string,
    @Param('imageId') imageId: string,
  ) {
    await this.portalService.deleteSlideImage(req.user.userId, slideId, imageId);
    return { message: 'Slide image deleted' };
  }

  // ========== Portal Narrative ==========

  @Get('narrative')
  async getNarrative(@Request() req: { user: { userId: string } }) {
    const narrative = await this.portalService.getNarrative(req.user.userId);
    return narrative || { text: '' };
  }

  @Put('narrative')
  async upsertNarrative(
    @Request() req: { user: { userId: string } },
    @Body() dto: UpdatePortalNarrativeDto,
  ) {
    return this.portalService.upsertNarrative(req.user.userId, dto);
  }
}
