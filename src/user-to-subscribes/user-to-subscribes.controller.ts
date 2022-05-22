import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { UserToSubscribesService } from './user-to-subscribes.service';
import { CreateUserToSubscribeDto } from './dto/createUserToSubscribe.dto';
import { AuthGuard, authTarget } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { ICurrentUser } from '../serializers/user.serializer';
import { UsersService } from '../users/users.service';

@Controller('user_to_subscribes')
@UseGuards(AuthGuard(authTarget.USER))
export class UserToSubscribesController {
  constructor(
    private readonly userToSubscribesService: UserToSubscribesService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/')
  async create(
    @CurrentUser() user: ICurrentUser,
    @Body() createUserToSubscribeDto: CreateUserToSubscribeDto,
  ) {
    const currentUser = await this.usersService.find(user._id);
    return this.userToSubscribesService.create(currentUser, createUserToSubscribeDto);
  }
}
