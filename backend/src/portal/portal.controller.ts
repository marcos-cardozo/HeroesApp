import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PortalService } from './portal.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateMoodBoardImageDto } from './dto/create-mood-board-image.dto';
import { UpdateMoodBoardImageDto } from './dto/update-mood-board-image.dto';
import { CreateKeyBeliefDto } from './dto/create-key-belief.dto';
import { UpdateKeyBeliefDto } from './dto/update-key-belief.dto';
import { CreatePortalSlideDto } from './dto/create-portal-slide.dto';
import { UpdatePortalSlideDto } from './dto/update-portal-slide.dto';
import { AddSlideImageDto } from './dto/add-slide-image.dto';
import { UpsertNarrativeDto } from './dto/upsert-narrative.dto';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    nombre: string;
  };
}

@Controller('portal')
@UseGuards(JwtAuthGuard)
export class PortalController {
  constructor(private readonly portalService: PortalService) {}

  // --------------------------- Vista completa -------------------------------

  @Get()
  getOverview(@Request() req: RequestWithUser) {
    return this.portalService.getOverview(req.user.id);
  }

  // ------------------------------ Mood Board --------------------------------

  @Get('mood-board')
  getMoodBoard(@Request() req: RequestWithUser) {
    return this.portalService.getMoodBoard(req.user.id);
  }

  @Post('mood-board')
  createMoodBoardImage(
    @Request() req: RequestWithUser,
    @Body() dto: CreateMoodBoardImageDto,
  ) {
    return this.portalService.createMoodBoardImage(req.user.id, dto);
  }

  @Patch('mood-board/:id')
  updateMoodBoardImage(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateMoodBoardImageDto,
  ) {
    return this.portalService.updateMoodBoardImage(id, req.user.id, dto);
  }

  @Delete('mood-board/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMoodBoardImage(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
  ) {
    return this.portalService.deleteMoodBoardImage(id, req.user.id);
  }

  // ------------------------------ Key Beliefs -------------------------------

  @Get('beliefs')
  getBeliefs(@Request() req: RequestWithUser) {
    return this.portalService.getBeliefs(req.user.id);
  }

  @Post('beliefs')
  createBelief(
    @Request() req: RequestWithUser,
    @Body() dto: CreateKeyBeliefDto,
  ) {
    return this.portalService.createBelief(req.user.id, dto);
  }

  @Patch('beliefs/:id')
  updateBelief(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdateKeyBeliefDto,
  ) {
    return this.portalService.updateBelief(id, req.user.id, dto);
  }

  @Delete('beliefs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBelief(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.portalService.deleteBelief(id, req.user.id);
  }

  // -------------------------------- Slides ----------------------------------

  @Get('slides')
  getSlides(@Request() req: RequestWithUser) {
    return this.portalService.getSlides(req.user.id);
  }

  @Post('slides')
  createSlide(
    @Request() req: RequestWithUser,
    @Body() dto: CreatePortalSlideDto,
  ) {
    return this.portalService.createSlide(req.user.id, dto);
  }

  @Patch('slides/:id')
  updateSlide(
    @Request() req: RequestWithUser,
    @Param('id') id: string,
    @Body() dto: UpdatePortalSlideDto,
  ) {
    return this.portalService.updateSlide(id, req.user.id, dto);
  }

  @Delete('slides/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSlide(@Request() req: RequestWithUser, @Param('id') id: string) {
    return this.portalService.deleteSlide(id, req.user.id);
  }

  @Post('slides/:slideId/images')
  addSlideImage(
    @Request() req: RequestWithUser,
    @Param('slideId') slideId: string,
    @Body() dto: AddSlideImageDto,
  ) {
    return this.portalService.addSlideImage(slideId, req.user.id, dto);
  }

  @Delete('slides/:slideId/images/:imageId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteSlideImage(
    @Request() req: RequestWithUser,
    @Param('slideId') slideId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.portalService.deleteSlideImage(slideId, imageId, req.user.id);
  }

  // ------------------------------- Narrative --------------------------------

  @Get('narrative')
  getNarrative(@Request() req: RequestWithUser) {
    return this.portalService.getNarrative(req.user.id);
  }

  @Put('narrative')
  upsertNarrative(
    @Request() req: RequestWithUser,
    @Body() dto: UpsertNarrativeDto,
  ) {
    return this.portalService.upsertNarrative(req.user.id, dto);
  }
}
