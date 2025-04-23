import { IsString } from 'class-validator';

export class GetRawQueryByEndpointNameQuery {
  @IsString()
  endpoint_name: string;

  constructor(endpoint_name: string) {
    this.endpoint_name = endpoint_name;
  }
} 