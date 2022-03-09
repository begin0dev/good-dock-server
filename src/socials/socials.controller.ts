import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard, authTarget } from '../guards/auth.guard';

@Controller('socials')
@UseGuards(AuthGuard(authTarget.USER))
export class SocialsController {
  @Get()
  async login() {
    return {
      message: 'Hello World!',
    };
  }
}
