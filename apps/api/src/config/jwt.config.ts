import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

export const jwtConfig = registerAs('jwt', (): JwtConfig => ({
  accessSecret: process.env.JWT_ACCESS_SECRET ?? 'change_me',
  refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'change_me',
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d'
}));
