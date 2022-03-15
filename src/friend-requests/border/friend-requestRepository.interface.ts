import { FriendRequest } from '../entities/friend-request.entity';

export interface IFriendRequestRepository {
  create(
    sentUserUuid: number,
    receivedUserUuid: number,
    isAccepted: boolean,
  ): Promise<FriendRequest>;

  getFriendRequests(receiverId: number): Promise<FriendRequest[]>;
}
