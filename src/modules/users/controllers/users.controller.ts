import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { CreateUserCommand } from '../commands/create-user.command';
import { UpdateUserCommand } from '../commands/update-user.command';
import { DeleteUserCommand } from '../commands/delete-user.command';
import { GetUsersQuery } from '../queries/get-users.query';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly usersService: UsersService,
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  async create(@Body() createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(createUserDto);
    const user = await this.commandBus.execute(command);
    return {
      data: user,
      be_time: new Date().toISOString(),
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll() {
    const query = new GetUsersQuery();
    const users = await this.queryBus.execute(query);
    return {
      data: users,
      be_time: new Date().toISOString(),
    };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.id);
    return {
      data: user,
      be_time: new Date().toISOString(),
    };
  }

  @Patch('profile/password')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password successfully updated.' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect.' })
  async updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
    await this.usersService.updatePassword(req.user.id, updatePasswordDto);
    return {
      message: 'Password updated successfully',
      be_time: new Date().toISOString(),
    };
  }

  @Patch('profile')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.updateProfile(req.user.id, updateUserDto);
    return {
      data: user,
      be_time: new Date().toISOString(),
    };
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user', type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.queryBus.execute(new GetUserByIdQuery(id));
    return {
      data: user,
      be_time: new Date().toISOString(),
    };
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.commandBus.execute(new UpdateUserCommand(id, updateUserDto));
    return {
      data: user,
      be_time: new Date().toISOString(),
    };
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  async remove(@Param('id') id: string) {
    await this.commandBus.execute(new DeleteUserCommand(id));
    return {
      message: 'User deleted successfully',
      be_time: new Date().toISOString(),
    };
  }
}
