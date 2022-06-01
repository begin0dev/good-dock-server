import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { UserToSubscribesService } from './user-to-subscribes.service';
import { UserToSubscribe, UserToSubscribeSchema } from '../schemas/userToSubscribe.schema';
import { User, UserSchema, UserDocument } from '../schemas/user.schema';
import { CreateUserToSubscribeDto } from './dto/createUserToSubscribe.dto';
import { mockUser } from '../schemas/__mocks__/user';
import { FindByMonthDto } from './dto/findByMonth.dto';

describe('UserToSubscribesService', () => {
  let module: TestingModule;
  let service: UserToSubscribesService;
  let userModel: Model<UserDocument>;
  let user: UserDocument;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(global.DATABASE_URL),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: UserToSubscribe.name, schema: UserToSubscribeSchema }]),
      ],
      providers: [UserToSubscribesService],
    }).compile();

    service = module.get<UserToSubscribesService>(UserToSubscribesService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
    user = await userModel.create(mockUser());
  });

  afterEach(async () => {
    await module.close();
  });

  it('create test', async () => {
    const datetime = dayjs();

    const dto = plainToClass(CreateUserToSubscribeDto, {
      type: 'subscribe',
      startDate: datetime.format(),
      ko: '넷플릭스',
      price: 1000,
      period: 1,
      unit: 'month',
    });

    const errors = await validate(dto);
    expect(errors.length).toEqual(0);

    const userToSub = await service.create(user, dto);
    expect(userToSub._id).not.toBeNull();
    expect(dayjs(userToSub.startDate).format()).toEqual(datetime.startOf('D').format());
  });

  it('findByMonth', async () => {
    const baseDate = 'Sun May 01 2022 00:00:00 GMT+0900 (한국 표준시)';
    const baseDto = {
      type: 'subscribe',
      price: 1000,
      period: 1,
      unit: 'month',
    };

    const userToSubs = [
      {
        startDate: dayjs(baseDate).startOf('M').format(),
        ko: '테스트1',
      },
      {
        startDate: dayjs(baseDate).startOf('M').add(10, 'day').format(),
        ko: '테스트2',
      },
      {
        startDate: dayjs(baseDate).startOf('M').subtract(10, 'day').format(),
        ko: '테스트3',
      },
      {
        startDate: dayjs(baseDate).startOf('M').add(1, 'day').format(),
        endDate: dayjs(baseDate).startOf('M').add(1, 'month').format(),
        ko: '테스트4',
      },
      {
        startDate: dayjs(baseDate).startOf('M').subtract(2, 'month').format(),
        endDate: dayjs(baseDate).startOf('M').add(15, 'day').format(),
        ko: '테스트5',
      },
      {
        startDate: dayjs(baseDate).startOf('M').subtract(3, 'month').format(),
        endDate: dayjs(baseDate).startOf('M').subtract(1, 'month').format(),
        ko: '테스트6',
      },
    ].map((dto) => plainToClass(CreateUserToSubscribeDto, { ...baseDto, ...dto }));

    for await (const dto of userToSubs) {
      await service.create(user, dto);
    }

    const test1 = await service.findByMonth(
      user._id.toString(),
      plainToClass(FindByMonthDto, { type: 'subscribe', date: baseDate }),
    );
    expect(test1.length).toEqual(5);
    expect(test1.find((s) => s.ko === '테스트6')).toBeUndefined();

    const test2 = await service.findByMonth(
      user._id.toString(),
      plainToClass(FindByMonthDto, {
        type: 'subscribe',
        date: dayjs(baseDate).subtract(1, 'month').format(),
      }),
    );
    expect(test2.length).toEqual(3);
    expect(
      test2
        .map((s) => s.ko)
        .sort()
        .join(','),
    ).toEqual(['테스트3', '테스트5', '테스트6'].join(','));
  });
});
