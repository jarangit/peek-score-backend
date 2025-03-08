import { Controller, Get, Query } from '@nestjs/common';
import { FixturesService } from './fixtures.service';

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Get()
  async getFixtures(@Query('date') date: string) {
    if (!date) {
      return { error: '❌ กรุณาระบุวันที่ (date) เช่น ?date=2025-03-08' };
    }
    return await this.fixturesService.getFixtures(date);
  }
}
