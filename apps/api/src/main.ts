import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiValidationPipe } from './common/pipes/validation.pipe';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') ?? 3000;
  const corsOrigin = configService.get<string>('app.corsOrigin') ?? 'http://localhost:4200';

  app.enableCors({
    origin: corsOrigin,
    credentials: true
  });

  app.useGlobalPipes(new ApiValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Localo API')
    .setDescription('Localo backend API')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}

void bootstrap();
