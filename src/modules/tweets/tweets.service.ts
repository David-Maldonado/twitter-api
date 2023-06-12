import { Injectable, NotFoundException } from '@nestjs/common';
import { Tweet } from './tweet.entity';
import { CreateTweetDto, PaginationQueryDto, UpdateTweetDto } from './dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities';

//es responsabilidad del servicio hacer las validaciones pertenecientes a la logica de negocios

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTweets({ limit, offset }: PaginationQueryDto): Promise<Tweet[]> {
    //el metodo fin() devuelve una promesa, es por eso que utilizamos async await
    //relations, le pasamos el campo relacionado y nos devulve en la peticion
    //skip and take para implementar pagination
    return await this.tweetRepository.find({
      relations: ['user'],
      skip: offset,
      take: limit,
    });
  }

  async getTweet(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (tweet) {
      return tweet;
    }

    throw new NotFoundException('Resource not found');
  }

  async createTweet({ message, user }: CreateTweetDto) {
    const tweet = this.tweetRepository.create({ message, user });
    return this.tweetRepository.save(tweet);
  }

  async updateTweet(id: number, { message }: UpdateTweetDto): Promise<Tweet> {
    //preload lo que hace es un merge
    const tweet: Tweet = await this.tweetRepository.preload({
      id,
      message,
    });

    if (tweet) {
      tweet.message = message;
      this.tweetRepository.save(tweet);
      return tweet;
    }

    throw new NotFoundException('Rosource not found');
  }

  async removeTweet(id: number): Promise<void> {
    const tweet = await this.tweetRepository.findOne({
      where: { id },
    });

    if (!tweet) {
      throw new NotFoundException('Resource not found');
    }
    this.tweetRepository.remove(tweet);
  }
}
