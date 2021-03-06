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

  /**
   * its about semantics and good practises. therefore i decided to create an extra method for signing up
   * @param createUserDto
   */
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

  async getAllUsers(loggedUserId) {
    //array that will be returned:
    const users: GetUsersDto[] = [];
    //array with all friend requests
    const temp = await this.userRepository.find();
    let status;

    for (const user of temp) {
      status = FriendStatus.None;
      //CASE: FRIENDS
      await this.requestRepository
        .find({
          where: [
            {
              senderId: user.id,
              receiverId: loggedUserId,
              isAccepted: true,
            },
            {
              senderId: loggedUserId,
              receiverId: user.id,
              isAccepted: true,
            },
          ],
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

  async getUser(number: number) {
    return await this.userRepository.findOne({ id: number });
  }

  async findAll() {
    return await this.userRepository.find();
  }
}
