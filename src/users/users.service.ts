import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FriendStatus } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getAllUsers(id) {
    return [
      { id: 1, username: 'Maya', status: FriendStatus.InvitationReceived },
      { id: 2, username: 'John', status: FriendStatus.Friends },
      { id: 3, username: 'Tonny78', status: FriendStatus.InvitationSent },
      { id: 4, username: 'Kim', status: FriendStatus.None },
    ];
  }
}
