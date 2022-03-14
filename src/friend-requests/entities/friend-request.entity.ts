import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  senderId: number;
  @Column()
  receiverId: number;
  @Column()
  isAccepted: boolean;
}
