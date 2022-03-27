import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Subscribe, SubscribeDocument } from '../schemas/subscribe.schema';
import { run0325 } from './seed';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SubscribesService {
  constructor(@InjectModel(Subscribe.name) private subscribeModel: Model<SubscribeDocument>) {}

  async run() {
    run0325.forEach(({ type, items }) => {
      if (type === 'add') {
        items.forEach(async (item) => {
          const subscribe = new this.subscribeModel(item);
          await subscribe.save();
        });
      }
    });
    return null;
  }

  async search(searchDto: SearchDto) {
    const koRegex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const excludeKoRegex = /[ㄱ-ㅎ|ㅏ-ㅣ]/;

    let lang: 'ko' | 'en' = 'en';
    let query = this.subscribeModel.find();
    if (searchDto.keyword) {
      let { keyword } = searchDto;
      if (searchDto.keyword.match(koRegex)) lang = 'ko';
      if (lang === 'ko') {
        keyword = keyword.replace(excludeKoRegex, '');
      }
      query = this.subscribeModel.find({ [lang]: new RegExp(keyword) });
    }
    if (searchDto.after) {
      const [ko, en] = searchDto.after.split('_');
      query = this.subscribeModel.find({
        $and: [query.getQuery(), { [lang]: { $gt: lang === 'ko' ? ko : en } }],
      });
    }
    return query.sort({ [lang]: 'asc' }).limit(searchDto.limit || 20);
  }
}
