import { Module } from '@nestjs/common';
import { FriendRequestsService } from '../domain/friend-requests.service';
import { FriendRequestsController } from './friend-requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IFriendRequestRepository } from '../domain/border/friend-requestRepository.interface';
import { FriendRequestRepositoryAdapter } from '../infrastructure/typeORM/friend-requestRepository.adapter';
import { FriendRequestSchema } from '../infrastructure/typeORM/friend-request.schema';

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequestSchema])],
  controllers: [FriendRequestsController],
  providers: [
    {
      provide: 'FriendRequestRepository',
      useClass: FriendRequestRepositoryAdapter,
    },
    {
      inject: ['FriendRequestRepository'],
      provide: 'FriendRequestsService',
      useFactory: (friendRequestRepository: IFriendRequestRepository) =>
        new FriendRequestsService(friendRequestRepository),
    },
  ],
})
export class FriendRequestsModule {}
