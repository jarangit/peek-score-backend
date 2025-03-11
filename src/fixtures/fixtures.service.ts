/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { APIFootballHttpService } from 'src/common/service/api-football-http.service';
import { mockFixtures } from 'src/common/mock-data/fixtures';
import { LeaguesService } from 'src/leagues/leagues.service';
import { RedisService } from 'src/redos/redis.service';
@Injectable()
export class FixturesService {
  private fixtures: any[];
  constructor(
    private readonly apiFootballHttpService: APIFootballHttpService,
    private readonly leaguesService: LeaguesService,
    private readonly redisService: RedisService,
  ) {}
  async getFixtures(date: string) {
    const cacheKey = `fixtures`;
    try {
      // ✅ เช็ค Cache ก่อน
      const cachedData = await this.redisService.get(cacheKey);
      if (cachedData) {
        console.log('✅ ใช้ข้อมูลจาก Cache');
        return cachedData;
      }
      const { data }: any = await firstValueFrom(
        this.apiFootballHttpService.get('/fixtures', {
          date,
        }),
      );
      const response = data.response;

      console.log('call api foot ball');
      // const { response }: any = await firstValueFrom(of(mockFixtures));

      if (response) {
        const league = await this.leaguesService.getLeagues();
        const leagueIds = league.response.map((item) => item.league.id);
        const filter = response.filter((item: any) =>
          leagueIds.includes(item.league.id),
        );
        const groupedMatches = this.groupByLeagueToArray(filter); // ใช้ matchesData เป็น JSON ที่คุณให้มา
        const data = {
          ...response.data,
          response: groupedMatches,
        };
        await this.redisService.set(cacheKey, data, 1800);
        return data;
      }
    } catch (error) {
      throw new Error('Failed to fetch fixtures');
    }
  }

  groupByLeagueToArray(matches: any) {
    const groupedObject = matches.reduce((acc: any, match: any) => {
      const leagueName = match.league.name;

      // ถ้ายังไม่มีลีกนี้ใน Object ให้เพิ่มเข้าไป
      if (!acc[leagueName]) {
        acc[leagueName] = {
          league: {
            name: leagueName,
            country: match.league.country,
            logo: match.league.logo,
            flag: match.league.flag,
            season: match.league.season,
            round: match.league.round,
          },
          matches: [],
        };
      }

      // เพิ่มแมตช์เข้าไปในลีกที่ตรงกัน
      acc[leagueName].matches.push({
        ...match,
      });

      return acc;
    }, {});

    // ✅ แปลง Object เป็น Array เพื่อให้ FE ใช้ .map() ได้ง่ายขึ้น
    return Object.values(groupedObject);
  }
}
