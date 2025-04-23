import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { DeleteRawQueryCommand } from '../delete-raw-query.command';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRawQueryCommand)
export class DeleteRawQueryHandler implements ICommandHandler<DeleteRawQueryCommand> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
  ) {}

  async execute(command: DeleteRawQueryCommand): Promise<void> {
    const { id } = command;
    
    const rawQuery = await this.rawQueryRepository.findOne({ where: { id } });
    if (!rawQuery) {
      throw new NotFoundException(`Raw query with ID "${id}" not found`);
    }
    
    await this.rawQueryRepository.softDelete(id);
  }
} 