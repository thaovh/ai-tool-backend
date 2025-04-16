import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFineTuneDto {
  @ApiProperty({
    example:
      'Trích xuất thông tin từ dòng sau: Ngày uống 3 gói chia 3 lần, 8h sáng 1 gói, 14h chiều 1 gói, 20h tối 1 gói (sau ăn)',
    description: 'The prompt text for fine-tuning',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty({
    example:
      '[SUDUNGTHUOC: [{"time": "08:00", "action": "uống", "quantity": 1.0}, {"time": "14:00", "action": "uống", "quantity": 1.0}, {"time": "20:00", "action": "uống", "quantity": 1.0}]]',
    description: 'The expected response for the prompt',
  })
  @IsString()
  @IsNotEmpty()
  response: string;

  @ApiProperty({
    example: false,
    description: 'Whether the fine-tune data has been checked',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isChecked?: boolean;
}
