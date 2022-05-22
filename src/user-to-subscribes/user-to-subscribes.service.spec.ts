import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';

import { UserToSubscribesService } from './user-to-subscribes.service';
import { UserToSubscribe, UserToSubscribeSchema } from '../schemas/userToSubscribe.schema';

describe('UserToSubscribesService', () => {
  let module: TestingModule;
  let service: UserToSubscribesService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(global.DATABASE_URL),
        MongooseModule.forFeature([{ name: UserToSubscribe.name, schema: UserToSubscribeSchema }]),
      ],
      providers: [UserToSubscribesService],
    }).compile();

    service = module.get<UserToSubscribesService>(UserToSubscribesService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create test', async () => {});
});
