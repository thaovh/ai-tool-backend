import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { UpdateRawQueryCommand } from '../update-raw-query.command';
import { User } from '../../../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateRawQueryCommand)
export class UpdateRawQueryHandler implements ICommandHandler<UpdateRawQueryCommand> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: UpdateRawQueryCommand): Promise<RawQuery> {
    const { id, dto, userId } = command;
    
    const rawQuery = await this.rawQueryRepository.findOne({ where: { id } });
    if (!rawQuery) {
      throw new NotFoundException(`Raw query with ID "${id}" not found`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    const updatedRawQuery = this.rawQueryRepository.create({
      ...rawQuery,
      ...dto,
      updatedBy: user,
    });
    
    return this.rawQueryRepository.save(updatedRawQuery);
  }
} 