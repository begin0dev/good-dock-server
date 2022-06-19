import { ICurrentUser } from '../serializers/user.serializer';

declare global {
  namespace Express {
    export interface Request {
      user?: ICurrentUser;
    }
  }
}

export {};
