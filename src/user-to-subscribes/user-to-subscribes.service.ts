import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserToSubscribe } from '../schemas/userToSubscribe.schema';
import { CreateUserToSubscribeDto } from './dto/createUserToSubscribe.dto';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserToSubscribesService {
  constructor(@InjectModel(UserToSubscribe.name) private userToSubscribeModel: Model<UserToSubscribe>) {}

  async create(user: User, createDto: CreateUserToSubscribeDto): Promise<UserToSubscribe> {
    const createdUserToSubscribe = new this.userToSubscribeModel(createDto);
    return createdUserToSubscribe.save();
  }
}
