import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import APIToolkit from 'apitoolkit-fastify';
import { AllExceptionsFilter } from './app.filter';
import Fastify from 'fastify';
import { sdk } from './telemetry';

async function bootstrap() {
  const fastify = Fastify();

  sdk.start();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify as any),
  );
  // const apitoolkitClient = APIToolkit.NewClient({
  //   apiKey: '<API_KEY>',
  //   fastify,
  // });
  // apitoolkitClient.init();

  // Register the exceptions filter as a global filter
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
