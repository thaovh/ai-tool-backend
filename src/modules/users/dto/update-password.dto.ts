import { IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty({
        description: 'Current password',
        example: 'currentPassword123',
    })
    @IsString()
    currentPassword: string;

    @ApiProperty({
        description: 'New password',
        example: 'newPassword123',
        minLength: 8,
    })
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
    })
    newPassword: string;

    @ApiProperty({
        description: 'Confirm new password',
        example: 'newPassword123',
    })
    @IsString()
    confirmPassword: string;
} 