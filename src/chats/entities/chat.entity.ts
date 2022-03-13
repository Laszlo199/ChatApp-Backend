import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column()
  userId: number;
  @Column()
  roomId: number;
}
