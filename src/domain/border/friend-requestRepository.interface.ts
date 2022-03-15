import { FriendRequest } from '../../core/friend-request.entity';

export interface IFriendRequestRepository {
  create(
    sentUserUuid: number,
    receivedUserUuid: number,
    isAccepted: boolean,
  ): Promise<FriendRequest>;

  getFriendRequests(receiverId: number): Promise<FriendRequest[]>;
}
