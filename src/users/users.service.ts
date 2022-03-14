import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { FriendStatus, GetUsersDto } from './dto/get-users.dto';
import { FriendRequest } from '../friend-requests/entities/friend-request.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(FriendRequest)
    private requestRepository: Repository<FriendRequest>,
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
    //array that will be returned:
    const users: GetUsersDto[] = [];
    //array with all friend requests
    const temp = await this.userRepository.find();
    let status = FriendStatus.None;

    for (const user of temp) {
      //CASE: FRIENDS
      await this.requestRepository
        .find({
          where: {
            senderId: user.id,
            receiverId: loggedUserId,
            isAccepted: true,
          },
        })
        .then((result) => {
          if (result.length > 0) {
            status = FriendStatus.Friends;
          }
        });
      //CASE: FRIENDS
      await this.requestRepository
        .find({
          where: {
            senderId: loggedUserId,
            receiverId: user.id,
            isAccepted: true,
          },
        })
        .then((result) => {
          if (result.length > 0) {
            status = FriendStatus.Friends;
          }
        });

      //CASE: INVITATION RECEIVED
      await this.requestRepository
        .find({
          where: {
            senderId: user.id,
            receiverId: loggedUserId,
            isAccepted: false,
          },
        })
        .then((result) => {
          if (result.length > 0) {
            status = FriendStatus.InvitationReceived;
          }
        });

      //CASE: INVITATION SENT
      await this.requestRepository
        .find({
          where: {
            senderId: loggedUserId,
            receiverId: user.id,
            isAccepted: false,
          },
        })
        .then((result) => {
          if (result.length > 0) {
            status = FriendStatus.InvitationSent;
          }
        });

      if (user.id != loggedUserId) {
        users.push({
          id: user.id,
          username: user.username,
          status: status,
        });
      }
    }

    return users;
  }
}
