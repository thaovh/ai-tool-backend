import { IsUUID } from 'class-validator';
import { UpdateFineTuneDto } from '../dto/update-fine-tune.dto';
import { User } from '../../users/entities/user.entity';

export class UpdateFineTuneCommand {
  @IsUUID()
  id: string;

  updateFineTuneDto: UpdateFineTuneDto;
  user: User;

  constructor(id: string, updateFineTuneDto: UpdateFineTuneDto, user: User) {
    this.id = id;
    this.updateFineTuneDto = updateFineTuneDto;
    this.user = user;
  }
}
