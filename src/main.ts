import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT)

  const config = new DocumentBuilder()
  .setTitle('Food Ordering App')
  .setVersion('1.0')
  .setDescription('Demo Food ordering app that contain everylogic')
  .build()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      transform : true
    })
  )
  const option = SwaggerModule.createDocument(app , config)
  SwaggerModule.setup('',app , option)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
