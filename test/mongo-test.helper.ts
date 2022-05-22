import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create();
  global.DATABASE_URL = mongoServer.getUri();
});

afterEach(async () => {
  await mongoServer.stop();
});
