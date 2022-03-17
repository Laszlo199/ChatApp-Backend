import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  // @Column({ unique: true })
  @Column()
  username: string;
  @Column()
  password: string;
}
