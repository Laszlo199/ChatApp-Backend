import { Injectable } from '@nestjs/common';
import { UpdateFriendRequestDto } from '../friend-requests/dto/update-friend-request.dto';
import { FriendRequest } from '../core/friend-request.entity';
import { IFriendRequestRepository } from './border/friend-requestRepository.interface';

@Injectable()
export class FriendRequestsService {
  private friendRequestRepo: IFriendRequestRepository;

  constructor(friendRequestRepository: IFriendRequestRepository) {
    this.friendRequestRepo = friendRequestRepository;
  }

  async create(
    senderId: number,
    receiverId: number,
    isAccepted: boolean,
  ): Promise<FriendRequest> {
    return this.friendRequestRepo.create(senderId, receiverId, isAccepted);
  }

  getFriendRequests(receiverId: number): Promise<FriendRequest[]> {
    return this.friendRequestRepo.getFriendRequests(receiverId);
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
