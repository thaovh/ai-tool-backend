import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SearchFineTuneDto {
  @ApiProperty({
    description: 'Search keyword for prompt field',
    required: false,
    example: 'machine learning',
  })
  @IsString()
  @IsOptional()
  keyword?: string;
}
