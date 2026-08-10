import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodBoardImageDto } from './create-mood-board-image.dto';

export class UpdateMoodBoardImageDto extends PartialType(
  CreateMoodBoardImageDto,
) {}
