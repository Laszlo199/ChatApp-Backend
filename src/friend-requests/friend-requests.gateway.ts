import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FriendRequestsService } from './friend-requests.service';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';

@WebSocketGateway({ cors: true })
export class FriendRequestsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly requestService: FriendRequestsService) {}

  @SubscribeMessage('sendRequest')
  async create(@MessageBody() requestDto: CreateFriendRequestDto) {
    const request = await this.requestService.create(requestDto);
    this.server.emit(request.receiverId + '-request', request);
  }
}
