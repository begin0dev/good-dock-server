import { Module } from '@nestjs/common';

import { SocialsController } from './socials.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [SocialsController],
})
export class SocialsModule {}
