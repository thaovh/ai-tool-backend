import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FineTuneData } from '../../entities/fine-tune-data.entity';
import { DeleteFineTuneCommand } from '../delete-fine-tune.command';

@CommandHandler(DeleteFineTuneCommand)
export class DeleteFineTuneHandler implements ICommandHandler<DeleteFineTuneCommand> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) { }

  async execute(command: DeleteFineTuneCommand): Promise<void> {
    const { id } = command;
    const fineTuneData = await this.fineTuneRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!fineTuneData) {
      throw new NotFoundException('Fine-tune data not found');
    }

    await this.fineTuneRepository.softDelete(id);
  }
}
