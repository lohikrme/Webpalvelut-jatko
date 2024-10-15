// main.ts
// updatd 15th october 2024

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerInfo = {
  api_path: '/docs',
  title: 'Pets Service API',
  description: 'Backend for pets',
  version: '0.9',
  contact: {
    name: '',
    url: '',
    email: '',
  },
  tags: '',
};

async function bootstrap() {
  const port = 3000;
  console.log(
    `Starting pets server on port ${port}` + `\nPress control+c to stop.`,
  );
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config_doc = new DocumentBuilder()
    .setTitle(swaggerInfo.title)
    .setDescription(swaggerInfo.description)
    .setVersion(swaggerInfo.version)
    .setContact(
      swaggerInfo.contact.name,
      swaggerInfo.contact.url,
      swaggerInfo.contact.email,
    )
    .addTag(swaggerInfo.tags)
    .build();

  const document = SwaggerModule.createDocument(app, config_doc);
  // api path '/docs' means u can open open API
  // GUI using the 'localhost:3000/docs' url
  SwaggerModule.setup(swaggerInfo.api_path, app, document);
  await app.listen(port);
}
bootstrap();
