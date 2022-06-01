import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserToSubscribe } from '../schemas/userToSubscribe.schema';
import { CreateUserToSubscribeDto } from './dto/createUserToSubscribe.dto';
import { UserDocument } from '../schemas/user.schema';
import { FindByMonthDto } from './dto/findByMonth.dto';

@Injectable()
export class UserToSubscribesService {
  constructor(@InjectModel(UserToSubscribe.name) private userToSubscribeModel: Model<UserToSubscribe>) {}

  create(user: UserDocument, createDto: CreateUserToSubscribeDto) {
    const createdUserToSubscribe = new this.userToSubscribeModel(createDto);
    createdUserToSubscribe.user = user;
    return createdUserToSubscribe.save();
  }

  findByMonth(userId: string, findByMonthDto: FindByMonthDto) {
    return this.userToSubscribeModel.find({
      $and: [
        {
          user: userId,
          type: findByMonthDto.type,
          startDate: { $lte: dayjs(findByMonthDto.date).endOf('M') },
        },
        {
          $or: [{ endDate: null }, { endDate: { $gte: dayjs(findByMonthDto.date).startOf('M') } }],
        },
      ],
    });
  }
}
