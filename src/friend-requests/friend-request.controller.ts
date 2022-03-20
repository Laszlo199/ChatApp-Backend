import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { FriendRequestsService } from './friend-requests.service';
import { Body, Controller, Delete, Inject, Param, Patch } from '@nestjs/common';

@Controller('friendRequest')
export class FriendRequestController {
  constructor(private readonly friendService: FriendRequestsService) {}

  @Patch('/updateRequest')
  update(
    @Param('id') id: number,
    @Body() updateFriendRequestDto: UpdateFriendRequestDto,
  ) {
    return this.friendService.update(+id, updateFriendRequestDto);
  }

  @Delete('/deleteRequest')
  remove(@Param('id') id: number) {
    return this.friendService.remove(id);
  }
}
