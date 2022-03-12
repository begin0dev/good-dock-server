import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { OAuthService } from '../helpers/social-o-auth/o-auth.service';
import { IKakaoAccount, TOAuthProvider } from '../helpers/social-o-auth/o-auth.types';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private oAuthService: OAuthService,
    private tokenService: TokensService,
  ) {}

  findByProvider(provider: TOAuthProvider, providerId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        provider,
        providerId,
      },
    });
  }

  async findOrCreate(provider: TOAuthProvider, accessToken: string): Promise<User> {
    const profile = await this.oAuthService.getProfile<IKakaoAccount>({ provider, accessToken });
    const user = await this.findByProvider(provider, String(profile.id));
    if (user) return user;

    return this.prisma.user.create({
      data: {
        provider,
        providerId: String(profile.id),
        displayName: profile?.properties?.nickname || '방문자',
        refreshToken: this.tokenService.generateRefreshToken(),
      },
    });
  }

  findByRefreshToken(refreshToken: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { refreshToken },
    });
  }
}
