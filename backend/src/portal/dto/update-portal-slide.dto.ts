import { PartialType } from '@nestjs/mapped-types';
import { CreatePortalSlideDto } from './create-portal-slide.dto';

export class UpdatePortalSlideDto extends PartialType(CreatePortalSlideDto) {}
