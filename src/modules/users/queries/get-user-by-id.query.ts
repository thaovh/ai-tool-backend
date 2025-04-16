import { IsUUID } from 'class-validator';

export class GetUserByIdQuery {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
