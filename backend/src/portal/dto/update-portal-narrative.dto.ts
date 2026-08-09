import { IsString, IsNotEmpty } from 'class-validator';

export class UpdatePortalNarrativeDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
