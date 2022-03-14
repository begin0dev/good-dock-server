import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ICurrentUser } from '../serializers/user.serializer';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext): ICurrentUser => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
