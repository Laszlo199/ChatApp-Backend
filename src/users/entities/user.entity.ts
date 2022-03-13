import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /*
   * we tell the ORM that the username should be unique*/
  @Column({ unique: true })
  username: string; // names must be this same dto must map to entity
  @Column()
  password: string; // newly added
}
