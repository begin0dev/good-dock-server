import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscribesService } from './subscribes.service';
import { SubscribesController } from './subscribes.controller';
import { Subscribe, SubscribeSchema } from '../schemas/subscribe.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Subscribe.name, schema: SubscribeSchema }])],
  providers: [SubscribesService],
  controllers: [SubscribesController],
})
export class SubscribesModule {}
