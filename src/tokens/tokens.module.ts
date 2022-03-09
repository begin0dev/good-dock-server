import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokensService } from './tokens.service';

@Module({
  imports: [],
  providers: [ConfigService, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
