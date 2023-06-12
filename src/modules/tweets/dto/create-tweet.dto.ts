import { IsObject, IsString } from 'class-validator';
import { User } from 'src/modules/users/entities';

//entiendo que el entity es para interactuar con la db, y el dto es para trasportar
export class CreateTweetDto {
  @IsString()
  readonly message: string;

  //el decorador isObjet valida que el valor enviado sea exactamente un objeto
  @IsObject()
  readonly user: Partial<User>;
}
