import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del hábito es requerido' })
  name: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
