import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { Chat } from "./entities/chat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
