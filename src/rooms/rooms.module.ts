import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequest } from '../friend-requests/entities/friend-request.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, FriendRequest, User])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
