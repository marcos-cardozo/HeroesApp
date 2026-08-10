import { IsInt, IsUrl, Min } from 'class-validator';

export class AddSlideImageDto {
  @IsUrl({}, { message: 'imageUrl debe ser una URL válida' })
  imageUrl!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
