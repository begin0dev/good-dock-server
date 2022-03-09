import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { TokensModule } from '../tokens/tokens.module';
import { PrismaModule } from '../prisma/prisma.module';
import { OAuthModule } from '../helpers/social-o-auth/o-auth.module';
import { oAuthProviders } from '../helpers/social-o-auth/o-auth.types';

@Module({
  imports: [
    TokensModule,
    PrismaModule,
    OAuthModule.register([
      {
        provider: oAuthProviders.KAKAO,
        clientId: process.env.KAKAO_APP_ID,
        clientSecret: process.env.KAKAO_APP_SECRET,
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
