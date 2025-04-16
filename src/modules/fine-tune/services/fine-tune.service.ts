import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { FineTuneData } from '../entities';
import { CreateFineTuneDto } from '../dto/create-fine-tune.dto';
import { UpdateFineTuneDto } from '../dto/update-fine-tune.dto';
import { User } from '../../users/entities/user.entity';
import { PaginationDto } from '../dto/pagination.dto';
import { SearchFineTuneDto } from '../dto/search-fine-tune.dto';

@Injectable()
export class FineTuneService {
  constructor(
    @InjectRepository(FineTuneData)
    private readonly fineTuneRepository: Repository<FineTuneData>,
  ) { }

  async create(createFineTuneDto: CreateFineTuneDto, user: User): Promise<FineTuneData> {
    const fineTuneData = this.fineTuneRepository.create({
      ...createFineTuneDto,
      createdById: user.id,
    });

    return this.fineTuneRepository.save(fineTuneData);
  }

  async findAll(paginationDto: PaginationDto): Promise<{ data: FineTuneData[]; total: number }> {
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

  async search(
    searchDto: SearchFineTuneDto,
    paginationDto: PaginationDto,
  ): Promise<{ data: FineTuneData[]; total: number }> {
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

  async findOne(id: string): Promise<FineTuneData> {
    const fineTuneData = await this.fineTuneRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!fineTuneData) {
      throw new NotFoundException('Fine-tune data not found');
    }

    return fineTuneData;
  }

  async update(
    id: string,
    updateFineTuneDto: UpdateFineTuneDto,
    user: User,
  ): Promise<FineTuneData> {
    const fineTuneData = await this.findOne(id);

    Object.assign(fineTuneData, {
      ...updateFineTuneDto,
      updatedById: user.id,
    });

    return this.fineTuneRepository.save(fineTuneData);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.fineTuneRepository.softDelete(id);
  }

  async updateIsChecked(id: string, isChecked: boolean, userId: string): Promise<FineTuneData> {
    await this.fineTuneRepository.update(id, {
      isChecked,
      updatedById: userId,
    });
    return await this.findOne(id);
  }
}
