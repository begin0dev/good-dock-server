import { Module } from '@nestjs/common';

import { SocialsController } from './socials.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SocialsController],
})
export class SocialsModule {}
