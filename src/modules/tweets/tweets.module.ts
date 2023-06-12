import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { User } from '../users/entities';
@Module({
  //para poder inyectar si o si hay que tener la clase importada
  imports: [TypeOrmModule.forFeature([Tweet, User])],
  controllers: [TweetsController],
  providers: [TweetService],
})
export class TweetsModule {}
