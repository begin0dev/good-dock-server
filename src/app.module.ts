import { Module } from '@nestjs/common';

import { SocialsModule } from './socials/socials.module';

@Module({
  imports: [SocialsModule],
})
export class AppModule {}
