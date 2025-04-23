import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DefineEndpointDto {
  @ApiProperty({ description: 'Unique name for the endpoint' })
  @IsString()
  endpoint_name: string;

  @ApiProperty({ description: 'The SQL query to be executed' })
  @IsString()
  query: string;

  @ApiProperty({ description: 'Description of the query', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Parameters for the query', required: false })
  @IsObject()
  @IsOptional()
  parameters?: Record<string, any>;

  @ApiProperty({ description: 'Whether the endpoint is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 