import { Controller, Get, Post, Query } from '@nestjs/common';

import { SubscribesService } from './subscribes.service';
import { SearchDto } from './dto/search.dto';

@Controller('subscribes')
export class SubscribesController {
  constructor(private readonly subscribesService: SubscribesService) {}

  @Get('search')
  async search(@Query() searchDto: SearchDto) {
    const payload = await this.subscribesService.search(searchDto);
    return { payload };
  }

  @Post('run')
  run() {
    // this.subscribesService.run();
    return null;
  }
}
