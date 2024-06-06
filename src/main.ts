import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('WSD')
  .setDescription('The WSD API description')
  .setVersion('1.0')
  .addTag('WSD')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('Your Application is running in port: ' + port);
  console.log(
    'To view the API from Swagger, click the link: http://localhost:' +
      port +
      '/api',
  );
}
bootstrap();
