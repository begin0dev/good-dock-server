import { CanActivate, Injectable, ExecutionContext, mixin, Inject, Type, forwardRef } from '@nestjs/common';

import { TOAuthProvider } from './o-auth.types';
import { OAuthService } from './o-auth.service';

export function OAuthGuard(provider: TOAuthProvider): Type<CanActivate> {
  @Injectable()
  class MixinOAuthGuard implements CanActivate {
    constructor(@Inject(forwardRef(() => OAuthService)) private readonly oAuthService: OAuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const { code, error, error_description } = req.query;

      const serverUrl = `${req.headers['x-forwarded-proto'] ?? req.protocol}://${req.get('host')}`;
      const redirectUri = `${serverUrl}${req.path}`;

      if (error) res.locals.error = error_description;
      if (!code) res.locals.redirectUrl = this.oAuthService.getAuthorizeUrl({ provider, redirectUri });
      if (code) {
        try {
          const accessToken = await this.oAuthService.getAccessToken({
            provider,
            code,
            redirectUri,
          });
          res.locals.redirectUrl = this.oAuthService.getCallbackUrl(provider, serverUrl, accessToken);
        } catch (err) {
          res.locals.error = err.message;
        }
      }

      return true;
    }
  }
  return mixin(MixinOAuthGuard);
}
