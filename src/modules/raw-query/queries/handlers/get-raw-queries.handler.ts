import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { GetRawQueriesQuery } from '../get-raw-queries.query';

@QueryHandler(GetRawQueriesQuery)
export class GetRawQueriesHandler implements IQueryHandler<GetRawQueriesQuery> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
  ) {}

  async execute(query: GetRawQueriesQuery): Promise<RawQuery[]> {
    const { endpoint_name } = query;
    
    const whereCondition: any = { deletedAt: null };
    if (endpoint_name) {
      whereCondition.endpoint_name = Like(`%${endpoint_name}%`);
    }

    return this.rawQueryRepository.find({
      where: whereCondition,
      relations: ['createdBy', 'updatedBy'],
      order: { createdAt: 'DESC' },
    });
  }
} 