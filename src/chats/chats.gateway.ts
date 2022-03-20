import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Server } from 'socket.io';
import { TypingDto } from './dto/typing.dto';

@WebSocketGateway({ cors: true })
export class ChatsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatsService: ChatsService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() createChatDto: CreateChatDto) {
    this.server.emit(createChatDto.roomName, createChatDto);
  }

  @SubscribeMessage('typing')
  setTyping(@MessageBody() typingEvent: TypingDto) {
    this.server.emit((typingEvent.roomName+'-typing'), typingEvent);
  }

}
