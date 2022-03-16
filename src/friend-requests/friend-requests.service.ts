import { Injectable } from '@nestjs/common';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entitites/friend-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepo: Repository<FriendRequest>,
  ) {}

  async create(
    createFriendRequestDto: CreateFriendRequestDto,
  ): Promise<FriendRequest> {
    const { senderId, receiverId, isAccepted } = createFriendRequestDto;
    try {
      return this.friendRequestRepo.save({ senderId, receiverId, isAccepted });
    } catch (error) {
      console.log('I dont create new friend request haha');
    }
  }

  getFriendRequests(receiverId: number): Promise<FriendRequest> {
    return this.friendRequestRepo.findOne(receiverId);
  }

  async findAll() {
    return 'hmm';
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
}
