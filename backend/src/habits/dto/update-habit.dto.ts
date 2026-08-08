import { IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
