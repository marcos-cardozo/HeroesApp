import { IsInt, IsPositive, IsString, IsOptional, Min } from 'class-validator';

export class SpendFragmentDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  amount: number;

  @IsString()
  @IsOptional()
  description?: string;
}
