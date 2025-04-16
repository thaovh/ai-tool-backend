import { CreateFineTuneDto } from '../dto/create-fine-tune.dto';
import { User } from '../../users/entities/user.entity';

export class CreateFineTuneCommand {
  constructor(
    public readonly createFineTuneDto: CreateFineTuneDto,
    public readonly user: User,
  ) {}
}
