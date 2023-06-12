import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TweetsModule } from './modules/tweets/tweets.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    //se utiliza para usar el modulo de manera global y no tener que andar importandolo en otros modulos.
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TweetsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    //+ es para castearlo a number, es que a veces devuelve el get un string
    AppModule.port = +this.configService.get('PORT');
  }
}
