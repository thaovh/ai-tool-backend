import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawQuery } from './entities/raw-query.entity';
import { RawQueryController } from './controllers/raw-query.controller';
import { DefineEndpointHandler } from './commands/handlers/define-endpoint.handler';
import { UpdateRawQueryHandler } from './commands/handlers/update-raw-query.handler';
import { DeleteRawQueryHandler } from './commands/handlers/delete-raw-query.handler';
import { GetRawQueriesHandler } from './queries/handlers/get-raw-queries.handler';
import { GetRawQueryByIdHandler } from './queries/handlers/get-raw-query-by-id.handler';
import { GetRawQueryByEndpointNameHandler } from './queries/handlers/get-raw-query-by-endpoint-name.handler';
import { User } from '../users/entities/user.entity';

const CommandHandlers = [DefineEndpointHandler, UpdateRawQueryHandler, DeleteRawQueryHandler];
const QueryHandlers = [GetRawQueriesHandler, GetRawQueryByIdHandler, GetRawQueryByEndpointNameHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([RawQuery, User])],
  controllers: [RawQueryController],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [TypeOrmModule],
})
export class RawQueryModule {} 