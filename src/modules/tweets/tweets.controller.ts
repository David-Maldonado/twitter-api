import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweets.service';
import { Tweet } from './tweet.entity';
import { CreateTweetDto, PaginationQueryDto, UpdateTweetDto } from './dto';

//comentario: en la programacion siempre es bueno poner todo explicitamente
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetSercive: TweetService) {}
  @Get()
  getTweets(@Query() pagination: PaginationQueryDto): Promise<Tweet[]> {
    return this.tweetSercive.getTweets(pagination);
  }

  @Get(':id')
  getTweet(@Param('id') id: number): Promise<Tweet> {
    return this.tweetSercive.getTweet(id);
  }
  @Post()
  //se puede filtar en el body la propiedad  (en este caso message)
  //code status
  //   @HttpCode(HttpStatus.NO_CONTENT)
  createTweet(@Body() message: CreateTweetDto): void {
    // console.log(message instanceof this.createTweet);
    this.tweetSercive.createTweet(message);
  }
  //patch: aplica una actualizacion parcial, put: sobreescribe todo
  @Patch(':id')
  updateTweet(
    @Param('id') id: number,
    @Body() message: UpdateTweetDto,
  ): Promise<Tweet> {
    return this.tweetSercive.updateTweet(id, message);
  }

  @Delete(':id')
  deleteTweet(@Param('id') id: number): void {
    this.tweetSercive.removeTweet(id);
  }

  //filtros query
  @Get('filter')
  getTweetsFilter(@Query() pagination: PaginationQueryDto): Promise<Tweet[]> {
    return this.tweetSercive.getTweets(pagination);
  }
}
