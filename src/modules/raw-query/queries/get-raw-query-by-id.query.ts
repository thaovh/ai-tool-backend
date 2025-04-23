import { IsUUID } from 'class-validator';

export class GetRawQueryByIdQuery {
  @IsUUID()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
} 