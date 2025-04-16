import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { UpdateUserCommand } from '../update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, updateUserDto } = command;

    const user = await this.userRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email || updateUserDto.phoneNumber) {
      const existingUser = await this.userRepository.findOne({
        where: [
          { email: updateUserDto.email, id: Not(id) },
          { phoneNumber: updateUserDto.phoneNumber, id: Not(id) },
        ],
      });

      if (existingUser) {
        throw new ConflictException('Email or phone number already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }
}
