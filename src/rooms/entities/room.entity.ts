import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  @Column()
  authorId: number;
}
