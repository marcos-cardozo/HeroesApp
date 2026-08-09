import { IsUrl, IsOptional, IsInt, Min } from 'class-validator';

export class CreateSlideImageDto {
  @IsUrl()
  imageUrl: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
