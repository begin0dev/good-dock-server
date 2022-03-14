import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { TokensModule } from '../tokens/tokens.module';
import { OAuthModule } from '../helpers/social-o-auth/o-auth.module';
import { oAuthProviders } from '../helpers/social-o-auth/o-auth.types';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokensModule,
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
