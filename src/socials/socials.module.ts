import { Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';

@Module({
  controllers: [SocialsController],
})
export class SocialsModule {}
