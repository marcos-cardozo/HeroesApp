import { IsInt, IsPositive, IsOptional, IsString, MaxLength } from 'class-validator';

export class SpendFragmentDto {
  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
