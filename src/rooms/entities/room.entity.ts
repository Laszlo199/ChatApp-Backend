import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * temporarily created
 */
@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
