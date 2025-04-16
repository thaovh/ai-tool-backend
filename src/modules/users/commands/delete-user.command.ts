import { IsUUID } from 'class-validator';

export class DeleteUserCommand {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
