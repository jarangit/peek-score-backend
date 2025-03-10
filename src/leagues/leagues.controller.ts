import { Controller, Get } from '@nestjs/common';
import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}
  @Get()
  async getAll() {
    return await this.leaguesService.getLeagues();
  }
}
