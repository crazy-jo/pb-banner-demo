import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  app.enableCors({
    origin: 'http://localhost:4200', // Specific origin allowed (can be a string, array, or boolean)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow the browser to send cookies and authorization headers
  });
  console.log(`🚀 Running on: http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
