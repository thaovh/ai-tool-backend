import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawQuery } from '../../entities/raw-query.entity';
import { DefineEndpointCommand } from '../define-endpoint.command';
import { User } from '../../../users/entities/user.entity';

@CommandHandler(DefineEndpointCommand)
export class DefineEndpointHandler implements ICommandHandler<DefineEndpointCommand> {
  constructor(
    @InjectRepository(RawQuery)
    private readonly rawQueryRepository: Repository<RawQuery>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(command: DefineEndpointCommand): Promise<RawQuery> {
    const { dto, userId } = command;
    
    // Get the user who is creating the query
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    const rawQuery = this.rawQueryRepository.create({
      ...dto,
      createdBy: user,
      updatedBy: user,
    });
    
    return this.rawQueryRepository.save(rawQuery);
  }
} 