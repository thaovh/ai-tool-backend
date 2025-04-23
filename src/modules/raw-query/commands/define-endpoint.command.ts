import { DefineEndpointDto } from '../dto/define-endpoint.dto';

export class DefineEndpointCommand {
  constructor(
    public readonly dto: DefineEndpointDto,
    public readonly userId: string,
  ) {}
} 