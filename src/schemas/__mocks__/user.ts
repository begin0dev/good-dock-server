import { faker } from '@faker-js/faker';

import { oAuthProviders } from '../../helpers/social-o-auth/o-auth.types';

export const mockUser = () => ({
  displayName: faker.name.findName(),
  provider: oAuthProviders.FACEBOOK,
  providerId: faker.datatype.uuid(),
  refreshToken: faker.datatype.uuid(),
});
