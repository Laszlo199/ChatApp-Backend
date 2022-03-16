import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequest } from './entitites/friend-request.entity';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.create(
      createFriendRequestDto.senderId,
      createFriendRequestDto.receiverId,
      createFriendRequestDto.isAccepted,
    );
  }

  @Get(':receiverId')
  getFriendRequests(
    @Param('receiverId') receiverId: number,
  ): Promise<FriendRequest[]> {
    return this.friendRequestsService.getFriendRequests(receiverId);
  }

  @Get()
  findAll() {
    return this.friendRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    return this.friendRequestsService.update(+id, updateFriendRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendRequestsService.remove(+id);
  }
}
