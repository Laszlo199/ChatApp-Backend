import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entitites/friend-request.entity';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestGateway } from './friend-request.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest])],
  providers: [friendRequestGateway, FriendRequestsService],
})
export class FriendRequestsModule {}
