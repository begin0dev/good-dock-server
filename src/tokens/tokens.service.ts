import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CurrentUser } from '../serializers/user.serializer';

export interface IJwtPayload {
  user: CurrentUser;
}

@Injectable()
export class TokensService {
  private readonly JWT_SECRET: string;

  constructor(private readonly configService: ConfigService) {
    this.JWT_SECRET = configService.get<string>('JWT_SECRET');
  }

  generateAccessToken(payload: IJwtPayload, expiresIn?: string): string {
    return jwt.sign(payload, this.JWT_SECRET, { issuer: 'good-dock', expiresIn: expiresIn || '1d' });
  }

  decodeAccessToken(token: string) {
    return jwt.verify(token, this.JWT_SECRET) as IJwtPayload;
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  generateVerifyCode(): string {
    return crypto.randomBytes(8).toString('hex');
  }
}
