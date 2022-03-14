import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  controllers: [AuthController],
})
export class AuthModule {}
