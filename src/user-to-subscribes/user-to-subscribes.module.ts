import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserToSubscribe, UserToSubscribeSchema } from '../schemas/userToSubscribe.schema';
import { UserToSubscribesController } from './user-to-subscribes.controller';
import { UserToSubscribesService } from './user-to-subscribes.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserToSubscribe.name, schema: UserToSubscribeSchema }]),
    UsersModule,
  ],
  providers: [UserToSubscribesService],
  controllers: [UserToSubscribesController],
})
export class UserToSubscribesModule {}
