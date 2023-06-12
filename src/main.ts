import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // permitir cualquier dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // transform transforma la peticion al tipo de dto especificado,
  //whitelist filtra que solo entren propiedades especificadas en el dto. y el forbidNonWhitelisted comentado arroja un error y notifica la propiedad que no existe en el dto.
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true, //para que nestjs 'pase correctamente' el tipo de datos pasados como parametros (id:number en vez de string)
      },

      // forbidNonWhitelisted: true
    }),
  );
  await app.listen(AppModule.port);
}
bootstrap();
