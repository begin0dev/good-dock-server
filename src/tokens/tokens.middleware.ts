import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { TokensService } from './tokens.service';

@Injectable()
export class TokensMiddleware implements NestMiddleware {
  constructor(private tokensService: TokensService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.get('authorization');
    if (!accessToken || !accessToken.startsWith('Bearer ')) return next();

    try {
      const { user } = this.tokensService.decodeAccessToken(accessToken.slice(7));
      req.user = user;
    } finally {
      next();
    }
  }
}
