import { Expose } from 'class-transformer';

import { BaseSerializer } from './base.serializer';

export class UserSerializer extends BaseSerializer {
  @Expose() displayName: string;
}

export interface CurrentUser {
  id: string;
  displayName: string;
}
