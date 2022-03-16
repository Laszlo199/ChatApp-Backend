import { Injectable } from '@nestjs/common';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entitites/friend-request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private friendRequestRepo: Repository<FriendRequest>,
  ) {}

  async create(
    senderId: number,
    receiverId: number,
    isAccepted: boolean,
  ): Promise<FriendRequest> {
    return this.friendRequestRepo.create(senderId, receiverId, isAccepted);
  }

  getFriendRequests(receiverId: number): Promise<FriendRequest | undefined> {
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
