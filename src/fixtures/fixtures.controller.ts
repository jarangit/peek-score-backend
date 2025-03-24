import { Controller, Get, Query } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { GetFixturesQueryDto } from './dto/get-fixtures.dot';

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Get('/cron')
  getCron() {
    return this.fixturesService.handleCron();
  }

  @Get()
  async getFixtures(@Query() query: GetFixturesQueryDto) {
    return await this.fixturesService.getFixtures(query);
  }
}
