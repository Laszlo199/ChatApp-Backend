import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendRequestDto {
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  receiverId: number;
  @ApiProperty()
  isAccepted: boolean;
}
