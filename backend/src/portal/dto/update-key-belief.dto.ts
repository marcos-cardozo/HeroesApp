import { PartialType } from '@nestjs/mapped-types';
import { CreateKeyBeliefDto } from './create-key-belief.dto';

export class UpdateKeyBeliefDto extends PartialType(CreateKeyBeliefDto) {}
