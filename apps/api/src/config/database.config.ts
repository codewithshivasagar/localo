import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  url: string;
  directUrl: string;
}

export const databaseConfig = registerAs('database', (): DatabaseConfig => ({
  url: process.env.DATABASE_URL ?? '',
  directUrl: process.env.DIRECT_URL ?? ''
}));
