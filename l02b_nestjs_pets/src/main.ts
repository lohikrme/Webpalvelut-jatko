import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  console.log(`Starting pets server on port ${port}` +
    `\nPress control+c to stop.`)
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
