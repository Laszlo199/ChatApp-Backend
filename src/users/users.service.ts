import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { FriendStatus } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.create(createUserDto);
  }

  private async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    try {
      return await this.userRepository.save({ username, password });
    } catch (error) {
      console.log(error.code);
    }
  }

  async signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (user && password === user.password) {
      return user;
    } else {
      return null;
    }
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
