import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The user ID (UUID)',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'refresh_token_here', description: 'The refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
