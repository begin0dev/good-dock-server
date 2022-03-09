import { Test, TestingModule } from '@nestjs/testing';

import { OAuthService } from '~app/helpers/o-auth-module/o-auth.service';
import { oAuthProviders } from '~app/helpers/o-auth-module/o-auth.types';

describe('OAuthService', () => {
  let service: OAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'OAUTH_OPTIONS',
          useValue: [
            {
              provider: oAuthProviders.FACEBOOK,
              clientId: '1234',
            },
          ],
        },
        OAuthService,
      ],
    }).compile();

    service = module.get<OAuthService>(OAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('#getAuthorizeUrl', () => {
    const url = service.getAuthorizeUrl({
      provider: oAuthProviders.FACEBOOK,
      redirectUri: 'http://test.com/test',
    });

    const expectUrl =
      'https://www.facebook.com/v10.0/dialog/oauth?response_type=code&client_id=1234&redirect_uri=http%3A%2F%2Ftest.com%2Ftest&scope=public_profile';
    expect(url).toEqual(expectUrl);
  });
});
