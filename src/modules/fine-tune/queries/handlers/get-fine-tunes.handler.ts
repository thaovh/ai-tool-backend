import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FineTuneData } from '../../entities/fine-tune-data.entity';
import { GetFineTunesQuery } from '../get-fine-tunes.query';

@QueryHandler(GetFineTunesQuery)
export class GetFineTunesHandler implements IQueryHandler<GetFineTunesQuery> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) { }

  async execute(query: GetFineTunesQuery): Promise<{ data: FineTuneData[]; total: number }> {
    const { paginationDto } = query;
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.fineTuneRepository.findAndCount({
      where: { deletedAt: null },
      relations: ['createdBy', 'updatedBy'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }
}
