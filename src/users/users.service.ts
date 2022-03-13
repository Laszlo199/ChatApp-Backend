import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
    const user = this.userRepository.create({ username, password });
    return await this.userRepository.save(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
