import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const port = process.env.PORT || 3000;
  app.enableCors({
    origin: [
      process.env.HOST_CLIENT || 'http://localhost:4200',
      '192.168.1.2:8080',
      '*',
    ],
    methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: '*',
  });
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
