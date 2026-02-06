import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const logger = new Logger('Bootstrap');
  
  // Enable CORS
  app.enableCors();
  
  // Global logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());
  
  const port = 3000;
  await app.listen(port);
  logger.log(`🚀 API listening on http://127.0.0.1:${port}`);
}

bootstrap();
