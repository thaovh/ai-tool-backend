import { IsString, IsOptional } from 'class-validator';

export class GetRawQueriesQuery {
  @IsString()
  @IsOptional()
  endpoint_name?: string;

  constructor(endpoint_name?: string) {
    this.endpoint_name = endpoint_name;
  }
} 