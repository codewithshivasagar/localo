import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

function parseCorsOrigins(corsOrigin: string, appEnv: string): string[] {
  const origins = corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (appEnv !== 'production' && !origins.includes('http://localhost:3001')) {
    origins.push('http://localhost:3001');
  }

  return origins;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const configService = app.get(ConfigService);
  const appEnv = configService.get<string>('app.env') ?? 'development';
  const port = configService.get<number>('app.port') ?? 3000;
  const corsOrigin =
    configService.get<string>('app.corsOrigin') ?? 'http://localhost:3001';

  app.enableCors({
    origin: parseCorsOrigins(corsOrigin, appEnv),
    credentials: true
  });

  app.useGlobalPipes(new ApiValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (process.env.ENABLE_SWAGGER !== 'false') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Localo API')
      .setDescription('Localo API documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
}

void bootstrap();
