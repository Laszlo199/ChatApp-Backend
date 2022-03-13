import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FriendStatus, GetUsersDto } from './dto/get-users.dto';
import { FriendRequest } from '../friend-requests/entities/friend-request.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async getAllUsers(loggedUserId) {
    const users: GetUsersDto[] = [];
    const temp = await this.userRepository.find();
    /*
    temp.forEach((user) => {
      //CASE: FRIENDS
      if (
        this.requestRepository
          .createQueryBuilder('request')
          .where('request.senderId = :senderId', { senderId: user.id })
          .andWhere('request.receiverId = :receiverId', {
            receiverId: loggedUserId,
          })
          .andWhere('isAccepted = :isAccepted', { isAccepted: true })
          .getOne() ||
        this.requestRepository
          .createQueryBuilder('request')
          .where('request.senderId = :senderId', { senderId: loggedUserId })
          .andWhere('request.receiverId = :receiverId', { receiverId: user.id })
          .andWhere('isAccepted = :isAccepted', { isAccepted: true })
          .getOne()
      )
        users.push({
          id: user.id,
          username: user.username,
          status: FriendStatus.Friends,
        });
      //CASE: INVITATION RECEIVED
      else if (
        this.requestRepository
          .createQueryBuilder('request')
          .where('request.senderId = :senderId', { senderId: user.id })
          .andWhere('request.receiverId = :receiverId', {
            receiverId: loggedUserId,
          })
          .andWhere('isAccepted = :isAccepted', { isAccepted: false })
          .getOne()
      )
        users.push({
          id: user.id,
          username: user.username,
          status: FriendStatus.InvitationReceived,
        });
      //CASE: INVITATION SENT
      else if (
        this.requestRepository
          .createQueryBuilder('request')
          .where('request.senderId = :senderId', { senderId: loggedUserId })
          .andWhere('request.receiverId = :receiverId', { receiverId: user.id })
          .andWhere('isAccepted = :isAccepted', { isAccepted: false })
          .getOne()
      )
        users.push({
          id: user.id,
          username: user.username,
          status: FriendStatus.InvitationSent,
        });
      //CASE: NONE
      else
        users.push({
          id: user.id,
          username: user.username,
          status: FriendStatus.None,
        });
    });

     */


    return [
      { id: 1, username: 'Maya', status: FriendStatus.InvitationReceived },
      { id: 2, username: 'John', status: FriendStatus.Friends },
      { id: 3, username: 'Tonny78', status: FriendStatus.InvitationSent },
      { id: 4, username: 'Kim', status: FriendStatus.None },
    ];


  }
}
