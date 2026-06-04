import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '@localo/shared-types';
import type { AuthenticatedUser } from '../../../common/types/authenticated-user.type';
import { UsersService } from '../../users/users.service';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret')
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    const user = await this.usersService.findCurrentUser(payload.sub).catch(() => {
      throw new UnauthorizedException('Invalid access token');
    });

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('User is not active');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role
    };
  }
}
