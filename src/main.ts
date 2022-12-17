import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from './error/http-exception.filter';
import { AppModule } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
