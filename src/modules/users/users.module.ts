import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

// Commands
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';

// Queries
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.handler';

const CommandHandlers = [CreateUserHandler, UpdateUserHandler, DeleteUserHandler];

const QueryHandlers = [GetUsersHandler, GetUserByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ...CommandHandlers, ...QueryHandlers],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule { }
