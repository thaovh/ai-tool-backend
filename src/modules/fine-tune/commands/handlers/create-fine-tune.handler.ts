import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FineTuneData } from '../../entities/fine-tune-data.entity';
import { CreateFineTuneCommand } from '../create-fine-tune.command';

@CommandHandler(CreateFineTuneCommand)
export class CreateFineTuneHandler implements ICommandHandler<CreateFineTuneCommand> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) {}

  async execute(command: CreateFineTuneCommand): Promise<FineTuneData> {
    const { createFineTuneDto, user } = command;

    const fineTuneData = this.fineTuneRepository.create({
      ...createFineTuneDto,
      createdById: user.id,
    });

    return this.fineTuneRepository.save(fineTuneData);
  }
}
