import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  // initiate nestjs backend application
  const app = await NestFactory.create(AppModule);
  // use validationpipes for login system
  app.useGlobalPipes(new ValidationPipe());

  // initiate configuration for open api swagger documentation
  const swagger_config = new DocumentBuilder()
    .setTitle('Photo-service-backend')
    .setDescription('This backend application has users, that own photos. Photos can belong to many categories, and categories can have many photos. Also, users have a profile.')
    .setVersion('1.0')
    .setLicense('GPLv3', 'https://www.gnu.org/licenses/quick-guide-gplv3')
    .setContact('Chinese Parrot', 'https://github.com/lohikrme/Webpalvelut-jatko/tree/main/L07_typeorm_photos', 'chinese.parrot@gmail.com')
    .addBearerAuth()
    .build();
    

  const documentFactory = () => SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
