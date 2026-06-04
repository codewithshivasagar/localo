import { randomUUID } from "node:crypto";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { JwtSignOptions } from "@nestjs/jwt";
import { compare, hash } from "bcryptjs";
import { Role } from "@localo/shared-types";
import { PrismaService } from "../../database/prisma.service";
import { UsersService } from "../users/users.service";
import type { UserResponseDto } from "../users/dto/user-response.dto";

interface JwtAccessPayload {
  sub: string;
  email: string;
  role: Role;
}

interface JwtRefreshPayload extends JwtAccessPayload {
  tokenId: string;
}

export interface AuthResponseData {
  user: UserResponseDto;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponseData> {
    const user = await this.usersService.findByEmailWithPassword(email);

    if (!user || !user.passwordHash || user.status !== "ACTIVE") {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordMatches = await compare(password, user.passwordHash);

    if (!passwordMatches) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.issueAuthResponse(user);
  }

  async refresh(refreshToken: string): Promise<AuthResponseData> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: payload.tokenId,
        userId: payload.sub,
        revokedAt: null,
      },
      include: {
        user: true,
      },
    });

    if (!storedToken || storedToken.expiresAt <= new Date()) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokenMatches = await compare(refreshToken, storedToken.tokenHash);

    if (
      !tokenMatches ||
      storedToken.user.status !== "ACTIVE" ||
      storedToken.user.deletedAt
    ) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    await this.revokeRefreshToken(payload.tokenId, payload.sub);

    return this.issueAuthResponse(storedToken.user);
  }

  async logout(refreshToken: string): Promise<void> {
    const payload = await this.verifyRefreshToken(refreshToken);
    const storedToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: payload.tokenId,
        userId: payload.sub,
        revokedAt: null,
      },
    });

    if (!storedToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const tokenMatches = await compare(refreshToken, storedToken.tokenHash);

    if (!tokenMatches) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    await this.revokeRefreshToken(payload.tokenId, payload.sub);
  }

  private async issueAuthResponse(user: {
    id: string;
    email: string;
    role: string;
    status: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Promise<AuthResponseData> {
    const userResponse = this.usersService.toUserResponse(user);
    const tokens = await this.issueTokens({
      id: user.id,
      email: user.email,
      role: user.role as Role,
    });

    return {
      user: userResponse,
      tokens,
    };
  }

  private async issueTokens(user: { id: string; email: string; role: Role }) {
    const tokenId = randomUUID();
    const accessPayload: JwtAccessPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const refreshPayload: JwtRefreshPayload = {
      ...accessPayload,
      tokenId,
    };
    const refreshExpiresIn = this.getRefreshExpiresIn();

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: this.configService.getOrThrow<string>("jwt.accessSecret"),
        expiresIn: this.getAccessExpiresIn(),
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.getOrThrow<string>("jwt.refreshSecret"),
        expiresIn: refreshExpiresIn.raw,
      }),
    ]);

    await this.prisma.refreshToken.create({
      data: {
        id: tokenId,
        userId: user.id,
        tokenHash: await hash(refreshToken, 12),
        expiresAt: refreshExpiresIn.date,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async verifyRefreshToken(
    refreshToken: string,
  ): Promise<JwtRefreshPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtRefreshPayload>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>("jwt.refreshSecret"),
        },
      );
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  private revokeRefreshToken(tokenId: string, userId: string) {
    return this.prisma.refreshToken.updateMany({
      where: {
        id: tokenId,
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  private getRefreshExpiresIn() {
    const raw = this.configService.get<string>("jwt.refreshExpiresIn") ?? "7d";

    return {
      raw: raw as JwtSignOptions["expiresIn"],
      date: new Date(Date.now() + parseDurationMs(raw)),
    };
  }

  private getAccessExpiresIn(): JwtSignOptions["expiresIn"] {
    return (this.configService.get<string>("jwt.accessExpiresIn") ??
      "15m") as JwtSignOptions["expiresIn"];
  }
}

const parseDurationMs = (duration: string) => {
  const match = /^(?<amount>\d+)(?<unit>[smhd])$/.exec(duration);

  if (!match?.groups) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const amount = Number.parseInt(match.groups.amount, 10);
  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[match.groups.unit];
};
