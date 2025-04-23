import { IsString, IsOptional, IsObject, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRawQueryDto {
  @ApiProperty({ description: 'Unique name for the endpoint', required: false })
  @IsString()
  @IsOptional()
  endpoint_name?: string;

  @ApiProperty({ description: 'The SQL query to be executed', required: false })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({ description: 'Description of the query', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Parameters for the query', required: false })
  @IsObject()
  @IsOptional()
  parameters?: Record<string, any>;

  @ApiProperty({ description: 'Whether the endpoint is active', required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 