import { NestFactory } from '@nestjs/core';

import { RotaryHub } from './rotary/rotary.hub';

async function bootstrap() {
  const turbineApp = await NestFactory.create(RotaryHub);

  turbineApp.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const exhaustPort = process.env.PORT || 4000;
  await turbineApp.listen(exhaustPort);

  console.log(`🏎️  Motori API turbine spinning on port ${exhaustPort}`);
  console.log(`🔧  Rotary hub operational`);
}

bootstrap();
