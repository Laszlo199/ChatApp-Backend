import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'net';
import { FriendRequestsService } from './friend-requests.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class friendRequestGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly friendRequestService: FriendRequestsService) {}

  @SubscribeMessage('createFriendRequest')
  create(@MessageBody() createFriendRequestDto: CreateFriendRequestDto) {
    return this.server.emit(typeof createFriendRequestDto);
  }

  @SubscribeMessage(':receiverId')
  getFriendRequests(@MessageBody('receiverId') receiverId: number) {
    return this.friendRequestService.getFriendRequests(receiverId);
  }

  @SubscribeMessage('findAllRequest')
  findAll() {
    return this.friendRequestService.findAll();
  }

  @SubscribeMessage('findOneFriendRequest')
  findOne(@MessageBody() id: number) {
    return this.friendRequestService.findOne(id);
  }

  @SubscribeMessage('updateFriendRequest')
  update(@MessageBody() updateFriendRequestDto: UpdateFriendRequestDto) {
    return this.friendRequestService.update(
      updateFriendRequestDto.id,
      updateFriendRequestDto,
    );
  }

  @SubscribeMessage('removeFriendRequest')
  remove(@MessageBody() id: number) {
    return this.friendRequestService.remove(id);
  }
}
