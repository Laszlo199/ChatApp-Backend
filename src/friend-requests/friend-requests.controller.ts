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

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(private readonly friendRequestsService: FriendRequestsService) {}

  @Post()
  create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.create(createFriendRequestDto);
  }

  @Get()
  findAll() {
    return this.friendRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendRequestsService.findOne(+id);
  }

  /**
   * only used to change isAccepted value from false to true when request is accepted
   * @param id
   */
  @Patch(':id')
  update(@Param('id') id: number) {
    return this.friendRequestsService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.friendRequestsService.remove(+id);
  }
}
