import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend-request.entity';
import { FriendRequestsService } from './friend-requests.service';
import { friendRequestGateway } from './friend-request.gateway';
import { FriendRequestController } from './friend-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest])],
  controllers: [FriendRequestController],
  providers: [friendRequestGateway, FriendRequestsService],
})
export class FriendRequestsModule {}
