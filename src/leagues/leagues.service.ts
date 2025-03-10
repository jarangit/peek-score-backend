import { Injectable } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { mockDataLeagues } from 'src/common/mock-data/leagues';
@Injectable()
export class LeaguesService {
  async getLeagues() {
    try {
      const response: any = await firstValueFrom(of(mockDataLeagues));
      const leagueIds = [39, 140, 135, 78, 61, 2, 3, 1, 45, 143, 137];
      const leagues = mockDataLeagues.response.filter((item: any) =>
        leagueIds.includes(item.league.id),
      );
      return {
        ...response,
        response: leagues,
      };
    } catch (error) {
      throw new Error('Failed to fetch leagues');
    }
  }
}
