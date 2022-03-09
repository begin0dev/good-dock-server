import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { SocialsController } from './socials/socials.controller';
import { SocialsModule } from './socials/socials.module';

@Module({
  imports: [SocialsModule],
  controllers: [SocialsController],
  providers: [AppService],
})
export class AppModule {}
