import { Injectable } from '@nestjs/common';
import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
import { UpdateFriendRequestDto } from './dto/update-friend-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendRequest } from './entities/friend-request.entity';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequest)
    private requestRepository: Repository<FriendRequest>,
  ) {}

  async create(createFriendRequestDto: CreateFriendRequestDto) {
    return await this.requestRepository.save(createFriendRequestDto);
  }

  async findAll() {
    return await this.requestRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} friendRequest`;
  }

  async update(id: number) {
    const requestToUpdate = await this.requestRepository.findOne({ id: id });
    requestToUpdate.isAccepted = true;
    return await this.requestRepository.save(requestToUpdate);
  }

  async remove(id: number) {
    const requestToRemove = await this.requestRepository.findOne({ id: id });
    await this.requestRepository.remove(requestToRemove);
    return requestToRemove;
  }
}
