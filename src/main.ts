import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/modules/app/app.module';
import 'dotenv/config';
import { HttpExceptionsFilter } from './exceptions/exceptions.filter';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionsFilter());
  await app.listen(process.env['API_PORT']!);
}

main().catch(console.error);
