import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdatePortalSlideDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  narrativeText?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
