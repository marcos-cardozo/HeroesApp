import { IsUrl, IsOptional, IsInt, Min } from 'class-validator';

export class CreateMoodBoardImageDto {
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
