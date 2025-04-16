import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FineTuneData } from '../../entities/fine-tune-data.entity';
import { SearchFineTunesQuery } from '../search-fine-tunes.query';

@QueryHandler(SearchFineTunesQuery)
export class SearchFineTunesHandler implements IQueryHandler<SearchFineTunesQuery> {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) { }

  async execute(query: SearchFineTunesQuery): Promise<{ data: FineTuneData[]; total: number }> {
    const { searchDto, paginationDto } = query;
    const { keyword } = searchDto;
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const whereCondition = { deletedAt: null };
    if (keyword) {
      whereCondition['prompt'] = Like(`%${keyword}%`);
    }

    const [data, total] = await this.fineTuneRepository.findAndCount({
      where: whereCondition,
      relations: ['createdBy', 'updatedBy'],
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }
}
