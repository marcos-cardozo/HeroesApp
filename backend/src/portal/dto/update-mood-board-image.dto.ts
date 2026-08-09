import { IsOptional, IsInt, Min } from 'class-validator';

export class UpdateMoodBoardImageDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
