import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { FineTuneData } from '../../entities';
import { GetFineTuneByIdQuery } from '../get-fine-tune-by-id.query';

@QueryHandler(GetFineTuneByIdQuery)
export class GetFineTuneByIdHandler implements IQueryHandler<GetFineTuneByIdQuery> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) { }

  async execute(query: GetFineTuneByIdQuery): Promise<FineTuneData> {
    const { id } = query;
    const fineTune = await this.fineTuneRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!fineTune) {
      throw new NotFoundException(`Fine-tune with ID "${id}" not found`);
    }

    return fineTune;
  }
}
