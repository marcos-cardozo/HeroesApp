import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePortalSlideDto {
  @IsInt()
  @Min(0)
  order!: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'El texto narrativo es requerido' })
  narrativeText!: string;
}
