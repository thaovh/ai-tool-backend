import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { GetRawQueryByEndpointNameQuery } from '../get-raw-query-by-endpoint-name.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetRawQueryByEndpointNameQuery)
export class GetRawQueryByEndpointNameHandler implements IQueryHandler<GetRawQueryByEndpointNameQuery> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
  ) {}

  async execute(query: GetRawQueryByEndpointNameQuery): Promise<RawQuery> {
    const { endpoint_name } = query;
    const rawQuery = await this.rawQueryRepository.findOne({
      where: { endpoint_name, deletedAt: null },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!rawQuery) {
      throw new NotFoundException(`Raw query with endpoint name "${endpoint_name}" not found`);
    }

    return rawQuery;
  }
} 