import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { UserToSubscribesService } from './user-to-subscribes.service';
import { CreateUserToSubscribeDto } from './dto/createUserToSubscribe.dto';
import { AuthGuard, authTarget } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { ICurrentUser } from '../serializers/user.serializer';
import { UsersService } from '../users/users.service';
import { FindByMonthDto } from './dto/findByMonth.dto';

@Controller('user_to_subscribes')
@UseGuards(AuthGuard(authTarget.USER))
export class UserToSubscribesController {
  constructor(
    private readonly userToSubscribesService: UserToSubscribesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  async findByMonth(@CurrentUser() user: ICurrentUser, @Query() findByMonthDto: FindByMonthDto) {
    const payload = await this.userToSubscribesService.findByMonth(user._id, findByMonthDto);
    return { payload };
  }

  @Post('/')
  async create(
    @CurrentUser() user: ICurrentUser,
    @Body() createUserToSubscribeDto: CreateUserToSubscribeDto,
  ) {
    const currentUser = await this.usersService.find(user._id);
    await this.userToSubscribesService.create(currentUser, createUserToSubscribeDto);
    return { payload: null };
  }
}
