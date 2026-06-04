import { registerAs } from '@nestjs/config';

export interface AppConfig {
  env: string;
  port: number;
  corsOrigin: string;
}

export const appConfig = registerAs('app', (): AppConfig => ({
  env: process.env.NODE_ENV ?? 'development',
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3001'
}));
