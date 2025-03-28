import { Controller, Get, Param, Query } from '@nestjs/common';
import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}
  @Get()
  async getAll() {
    return await this.leaguesService.getLeagues();
  }

  @Get('/:id')
  async getLeagueById(
    @Param('id') id: string,
    @Query('season') season: string,
  ) {
    return await this.leaguesService.getById(id, season);
  }
}
