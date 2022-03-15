import { EntitySchema } from 'typeorm';
import { FriendRequest } from '../../core/friend-request.entity';

export const FriendRequestSchema = new EntitySchema<FriendRequest>({
  name: 'FriendRequest',
  target: FriendRequest,
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    senderId: {
      type: 'varchar',
    },
    receiverId: {
      type: 'varchar',
    },
    isAccepted: {
      type: 'boolean',
    },
  },
  relations: {},
});
