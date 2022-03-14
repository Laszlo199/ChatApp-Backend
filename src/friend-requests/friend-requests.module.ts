import { Module } from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from './entities/friend-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequest])],
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService],
})
export class FriendRequestsModule {}
