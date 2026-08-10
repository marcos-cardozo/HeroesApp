import { IsNotEmpty, IsString } from 'class-validator';

export class UpsertNarrativeDto {
  @IsString()
  @IsNotEmpty({ message: 'El texto de la narrativa es requerido' })
  text!: string;
}
