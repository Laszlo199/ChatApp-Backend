import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from '../friend-requests/entities/friend-request.entity';
import { User } from '../users/entities/user.entity';
import { GetRoomsDto } from './dto/get-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(FriendRequest)
    private requestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.roomRepository.save(createRoomDto);
  }

  async findAll() {
    return await this.roomRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  async getAll(userId: number) {
    //get all friends of that user
    const friends = await this.requestRepository.find({
      select: ['senderId', 'receiverId'],
      where: [
        { isAccepted: true, senderId: userId },
        { isAccepted: true, receiverId: userId },
      ],
    });

    //create an array with ids of users (friends + this user)
    const usersIds = [];
    friends.forEach((request) => {
      if (request.senderId != userId) usersIds.push(request.senderId);
      else if (request.receiverId != userId) usersIds.push(request.receiverId);
    });
    usersIds.push(userId);

    //find rooms for those users
    const rooms = await this.roomRepository.find({
      where: [{ authorId: In(usersIds) }],
    });

    //get usernames
    const roomsToReturn: GetRoomsDto[] = [];
    for (const room of rooms) {
      await this.userRepository
        .findOne({
          select: ['username'],
          where: [{ id: room.authorId }],
        })
        .then((user) =>
          roomsToReturn.push({
            id: room.id,
            name: room.name,
            author: user.username,
          }),
        );
    }

    return roomsToReturn;
  }
}
