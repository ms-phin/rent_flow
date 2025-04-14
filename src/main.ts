// import { ValidationPipe } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // Enable CORS
//   app.enableCors();

//   // Add middleware to log all requests and their headers
//   app.use((req, res, next) => {
//     console.log('Request URL:', req.originalUrl);
//     console.log('Request Method:', req.method);
//     console.log('Authorization Header:', req.headers.authorization);
//     console.log('Request Body:', JSON.stringify(req.body));
//     next();
//   });

//   // app.setGlobalPrefix('api');
//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(3000);
// }
// bootstrap();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Configure body parser middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Add middleware to log all requests and their headers
  app.use((req, res, next) => {
    console.log('Request URL:', req.originalUrl);
    console.log('Request Method:', req.method);
    console.log('Authorization Header:', req.headers.authorization);
    console.log('Request Body:', req.body); // This should now show the parsed body
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
