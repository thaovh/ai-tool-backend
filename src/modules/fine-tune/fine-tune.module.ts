import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FineTuneData } from './entities/fine-tune-data.entity';
import { FineTuneController } from './controllers/fine-tune.controller';
import { FineTuneService } from './services/fine-tune.service';

// Commands
import { CreateFineTuneHandler } from './commands/handlers/create-fine-tune.handler';
import { UpdateFineTuneHandler } from './commands/handlers/update-fine-tune.handler';
import { DeleteFineTuneHandler } from './commands/handlers/delete-fine-tune.handler';

// Queries
import { GetFineTunesHandler } from './queries/handlers/get-fine-tunes.handler';
import { GetFineTuneByIdHandler } from './queries/handlers/get-fine-tune-by-id.handler';
import { SearchFineTunesHandler } from './queries/handlers/search-fine-tunes.handler';

const CommandHandlers = [CreateFineTuneHandler, UpdateFineTuneHandler, DeleteFineTuneHandler];

const QueryHandlers = [GetFineTunesHandler, GetFineTuneByIdHandler, SearchFineTunesHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([FineTuneData])],
  controllers: [FineTuneController],
  providers: [FineTuneService, ...CommandHandlers, ...QueryHandlers],
  exports: [TypeOrmModule],
})
export class FineTuneModule {}
