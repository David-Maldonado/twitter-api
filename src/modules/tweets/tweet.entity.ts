import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/entities';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  message: string;

  //en user se uso de uno a muchos, entonces aqui corresponde de mucho a uno
  //el cascade true en este caso se utiliza para crear un usuario al crear el tw. y no crear primero y user y luego relacionarlos
  @ManyToOne((type) => User, (user) => user.tweets, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
