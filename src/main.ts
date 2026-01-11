import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import 'dotenv/config';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env['API_PORT']!);
}

main().catch(console.error);
