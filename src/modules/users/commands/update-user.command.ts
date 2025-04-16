import { IsUUID } from 'class-validator';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UpdateUserCommand {
  @IsUUID()
  id: string;

  updateUserDto: UpdateUserDto;

  constructor(id: string, updateUserDto: UpdateUserDto) {
    this.id = id;
    this.updateUserDto = updateUserDto;
  }
}
