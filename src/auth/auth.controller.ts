import { Controller, ForbiddenException, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { ICurrentUser, UserSerializer } from '../serializers/user.serializer';
import { JsendReturnType } from '../types/jsend.types';
import { AuthGuard, authTarget } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';
import modelSerializer from '../helpers/model-serializer';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService, private tokensService: TokensService) {}

  @Get('me')
  @UseGuards(AuthGuard(authTarget.USER))
  me(@CurrentUser() user: ICurrentUser): JsendReturnType<ICurrentUser> {
    return { payload: user };
  }

  @Get('access_token')
  async accessToken(@Req() req: Request) {
    const refreshToken = req.get('refresh_token');
    if (!refreshToken) throw new ForbiddenException();

    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) throw new ForbiddenException();

    const accessToken = this.tokensService.generateAccessToken({
      user: modelSerializer(user, UserSerializer),
    });
    return { meta: { accessToken } };
  }
}
