import { Injectable } from '@nestjs/common';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entities/friend-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepo: Repository<FriendRequest>,
  ) {}

  async create(createFriendRequestDto: CreateFriendRequestDto) {
    const { senderId, receiverId, isAccepted } = createFriendRequestDto;
    try {
      return this.friendRequestRepo.save({ senderId, receiverId, isAccepted });
    } catch (error) {
      console.log('I have not created new friend request...');
    }
  }

  getFriendRequests(receiverId: number): Promise<FriendRequest> {
    try {
      return this.friendRequestRepo.findOne(receiverId);
    } catch (error) {
      console.log('Wops');
    }
  }

  async findAll() {
    return this.friendRequestRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendRequest`;
  }

  update(id: number, updateFriendRequestDto: UpdateFriendRequestDto) {
    return this.friendRequestRepo.update(id, updateFriendRequestDto);
  }

  remove(id: number) {
    return this.friendRequestRepo.delete(id);
  }
}
