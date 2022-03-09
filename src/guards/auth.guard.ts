import { CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';

export const authTarget = {
  VISITOR: 'visitor',
  USER: 'user',
} as const;

export type TAuthTarget = typeof authTarget[keyof typeof authTarget];

export function AuthGuard(target: TAuthTarget): Type<CanActivate> {
  @Injectable()
  class MixinAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const { user } = context.switchToHttp().getRequest();
      if (target === authTarget.VISITOR && user) return false;
      if (target === authTarget.USER && !user) return false;
      return true;
    }
  }
  return mixin(MixinAuthGuard);
}
