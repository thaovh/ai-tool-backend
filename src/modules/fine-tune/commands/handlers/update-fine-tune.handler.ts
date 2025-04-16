import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FineTuneData } from '../../entities/fine-tune-data.entity';
import { UpdateFineTuneCommand } from '../update-fine-tune.command';

@CommandHandler(UpdateFineTuneCommand)
export class UpdateFineTuneHandler implements ICommandHandler<UpdateFineTuneCommand> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) {}

  async execute(command: UpdateFineTuneCommand): Promise<FineTuneData> {
    const { id, updateFineTuneDto, user } = command;

    const fineTuneData = await this.fineTuneRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!fineTuneData) {
      throw new NotFoundException('Fine-tune data not found');
    }

    Object.assign(fineTuneData, {
      ...updateFineTuneDto,
      updatedById: user.id,
    });

    return this.fineTuneRepository.save(fineTuneData);
  }
}
