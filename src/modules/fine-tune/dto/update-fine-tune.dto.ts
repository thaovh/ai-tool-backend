import { PartialType } from '@nestjs/swagger';
import { CreateFineTuneDto } from './create-fine-tune.dto';

export class UpdateFineTuneDto extends PartialType(CreateFineTuneDto) {}
