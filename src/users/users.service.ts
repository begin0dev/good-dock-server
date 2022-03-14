import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserDocument, User } from '../schemas/user.schema';
import { IKakaoAccount, TOAuthProvider } from '../helpers/social-o-auth/o-auth.types';
import { OAuthService } from '../helpers/social-o-auth/o-auth.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class UsersService {
  constructor(
    private oAuthService: OAuthService,
    private tokenService: TokensService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  findByProvider(provider: TOAuthProvider, providerId: string) {
    return this.userModel.findOne({ provider, providerId });
  }

  async findOrCreate(provider: TOAuthProvider, accessToken: string) {
    const profile = await this.oAuthService.getProfile<IKakaoAccount>({ provider, accessToken });
    const user = await this.findByProvider(provider, String(profile.id));
    if (user) return user;

    return this.userModel.create({
      provider,
      providerId: String(profile.id),
      displayName: profile?.properties?.nickname || '방문자',
      refreshToken: this.tokenService.generateRefreshToken(),
    });
  }

  findByRefreshToken(refreshToken: string) {
    return this.userModel.findOne({ refreshToken });
  }
}
