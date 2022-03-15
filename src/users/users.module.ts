import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FriendRequest } from '../core/friend-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, FriendRequest])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
