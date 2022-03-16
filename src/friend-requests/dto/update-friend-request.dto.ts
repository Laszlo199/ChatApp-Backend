import { PartialType } from '@nestjs/swagger';
import { CreateFriendRequestDto } from './create-friend-request.dto';

export class UpdateFriendRequestDto extends PartialType(
  CreateFriendRequestDto,
) {}
