import { Expose } from 'class-transformer';

import { BaseSerializer } from './base.serializer';

export class UserSerializer extends BaseSerializer {
  @Expose() displayName: string;
}

export interface ICurrentUser {
  _id: string;
  displayName: string;
}
