import { Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Repository } from 'typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { User } from '../users/entities/user.entity';
import { from, of } from 'rxjs';
import { GetUsersDto } from '../users/dto/get-users.dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private requestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFriendRequestDto: CreateFriendRequestDto) {
    return await this.requestRepository.save(createFriendRequestDto);
  }

  async findAll() {
    return await this.requestRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendRequest`;
  }

  update(id: number, updateFriendRequestDto: UpdateFriendRequestDto) {
    return `This action updates a #${id} friendRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} friendRequest`;
  }

  sendFriendRequest(loggedUserId: number, selectedUserId: number) {
    const friendRequest: FriendRequest = {
      senderId: loggedUserId,
      receiverId: selectedUserId,
      isAccepted: false,
    };
    return from(this.requestRepository.save(friendRequest));
  }
}
