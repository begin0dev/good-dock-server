import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard, authTarget } from '../guards/auth.guard';
import { FindUserDto } from './dtos/findUser.dto';
import { UsersService } from '../users/users.service';
import { CurrentUser, UserSerializer } from '../serializers/user.serializer';
import { JsendReturnType } from '../types/jsend.types';
import { TokensService } from '../tokens/tokens.service';
import modelSerializer from '../helpers/model-serializer';

@Controller('socials')
@UseGuards(AuthGuard(authTarget.VISITOR))
export class SocialsController {
  constructor(private usersService: UsersService, private tokenService: TokensService) {}

  @Post()
  async login(
    @Body() findUserDto: FindUserDto,
  ): Promise<JsendReturnType<CurrentUser, { accessToken: string; refreshToken: string }>> {
    const user = await this.usersService.findOrCreate(findUserDto.provider, findUserDto.accessToken);
    const userJson = modelSerializer(user, UserSerializer);
    const accessToken = this.tokenService.generateAccessToken({ user: userJson });
    return {
      payload: userJson,
      meta: {
        accessToken,
        refreshToken: user.refreshToken,
      },
    };
  }
}
