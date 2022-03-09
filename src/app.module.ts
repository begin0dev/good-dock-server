import { Module } from '@nestjs/common';

import { SocialsModule } from './socials/socials.module';

@Module({
  imports: [SocialsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
