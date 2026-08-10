import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateKeyBeliefDto {
  @IsString()
  @IsNotEmpty({ message: 'El texto de la creencia es requerido' })
  text!: string;

  @IsInt()
  @Min(0)
  order!: number;
}
