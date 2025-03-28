import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { mockDataLeagues } from 'src/common/mock-data/leagues';
import { FixturesService } from 'src/fixtures/fixtures.service';
@Injectable()
export class LeaguesService {
  constructor(
    @Inject(forwardRef(() => FixturesService))
    private readonly fixturesService: FixturesService,
  ) {}
  async getLeagues() {
    try {
      const response: any = await firstValueFrom(of(mockDataLeagues));
      // const leagueIds = [39, 140, 135, 78, 61, 2, 3, 1, 45, 143, 137];
      // const leagues = mockDataLeagues.response.filter((item: any) =>
      //   leagueIds.includes(item.league.id),
      // );
      return {
        ...response,
        // response: leagues,
      };
    } catch (error) {
      throw new Error('Failed to fetch leagues');
    }
  }

  async getById(id: string, season: string) {
    try {
      const response: any = await firstValueFrom(of(mockDataLeagues));
      const league = response.response.find(
        (item: any) => item.league.id === Number(id),
      );
      const fixtures = await this.fixturesService.getFixtures({
        league: id.toString(),
        season: season,
      });
      return {
        ...response,
        response: {
          ...league,
          fixtures: fixtures?.response,
        },
      };
    } catch (error) {
      throw new Error('Failed to fetch league by ID');
    }
  }
}
