import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePortalSlideDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  narrativeText: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
