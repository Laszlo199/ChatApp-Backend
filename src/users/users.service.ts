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

  /**
   * its about semantics and good practises. therefore i decided to create an extra method for signing up
   * @param createUserDto
   */
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.create(createUserDto);
  }

  /*
   * register a user*/
  private async create(createUserDto: CreateUserDto): Promise<User> {
    //return this.userRepository.save(createUserDto);
    const { username, password } = createUserDto;

    try {
      const user = this.userRepository.create({ username, password });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error.code);
      if (error.code === 'SQLITE_CONSTRAINT') {
        //duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /*
   * later we may change the name of dto to authCredentialsDto or something more descriptive */
  async signIn(createUserDto: CreateUserDto): Promise<string> {
    const { username, password } = createUserDto;
    // first of all I wanna check if such user exists within DB
    const user = await this.userRepository.findOne({ username });

    //https://docs.nestjs.com/security/encryption-and-hashing
    if (user && password === user.password) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async create2(user: CreateUserDto): Promise<User> {
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
