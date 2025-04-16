import { IsUUID } from 'class-validator';

export class GetFineTuneByIdQuery {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
