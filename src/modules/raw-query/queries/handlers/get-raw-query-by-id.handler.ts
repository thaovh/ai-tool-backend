import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { GetRawQueryByIdQuery } from '../get-raw-query-by-id.query';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetRawQueryByIdQuery)
export class GetRawQueryByIdHandler implements IQueryHandler<GetRawQueryByIdQuery> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
  ) {}

  async execute(query: GetRawQueryByIdQuery): Promise<RawQuery> {
    const { id } = query;
    const rawQuery = await this.rawQueryRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!rawQuery) {
      throw new NotFoundException(`Raw query with ID "${id}" not found`);
    }

    return rawQuery;
  }
} 