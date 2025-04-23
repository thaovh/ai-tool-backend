import { UpdateRawQueryDto } from '../dto/update-raw-query.dto';

export class UpdateRawQueryCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateRawQueryDto,
    public readonly userId: string,
  ) {}
} 