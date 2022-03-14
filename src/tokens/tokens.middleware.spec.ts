import { TokensMiddleware } from './tokens.middleware';

describe('TokensMiddleware', () => {
  it('should be defined', () => {
    expect(new TokensMiddleware()).toBeDefined();
  });
});
