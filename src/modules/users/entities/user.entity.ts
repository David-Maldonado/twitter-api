import { type } from 'os';
import { Tweet } from 'src/modules/tweets/tweet.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: true })
  imageUrl: string;
  //1 a muchos, de mucho a mucho y de 1 a 1.
  //ahora le diremos que un usuario puede tener varios tweets
  @OneToMany((type) => Tweet, (tweets) => tweets.user)
  tweets: Tweet[];

  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
