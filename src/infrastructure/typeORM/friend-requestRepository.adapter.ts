import { IFriendRequestRepository } from '../../domain/border/friend-requestRepository.interface';
import { FriendRequest } from '../../core/friend-request.entity';
import { EntityManager, Repository } from 'typeorm';
import { FriendRequestSchema } from './friend-request.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendRequestRepositoryAdapter
  implements IFriendRequestRepository
{
  private readonly friendRequestRepo: Repository<FriendRequest>;

  constructor(private readonly em: EntityManager) {
    this.friendRequestRepo = em.getRepository(FriendRequestSchema);
  }

  create(
    senderId: number,
    receiverId: number,
    isAccepted: boolean,
  ): Promise<FriendRequest> {
    return this.friendRequestRepo.save({
      senderId: senderId,
      receiverId: receiverId,
      isAccepted: isAccepted,
    });
  }

  getFriendRequests = (receiverId: number): Promise<FriendRequest[]> => {
    return this.friendRequestRepo.find({
      where: { receiverId: receiverId },
    });
  };
}
