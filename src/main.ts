import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('E-commerce')
  .setDescription('The e-commerce API description')
  .addBearerAuth()
  .setVersion('1.0')
  .addTag('e-commerce')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('/', app, document);
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.useGlobalPipes(new ValidationPipe());
  
//   app.enableCors();

//   await app.listen(3000);
// }
bootstrap();}
