import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import { ApiBearerAuth } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiLimiter = rateLimit({   
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 5 requests
    message:
      "Too much data was taken, so 1 hour data was restricted."
  });
  app.use("/api/", apiLimiter);

  const authLimiter = rateLimit({   
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 10, // start blocking after 5 requests
    message:
      "Too much data was taken, so 1 hour data was restricted."
  });
  app.use("/api/auth/", authLimiter);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .setTitle('EC - Backend')
    .setDescription('Created by Erdinç Cürebal - Full Stack Developer')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('panel', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

