/* eslint-disable @typescript-eslint/no-require-imports */
import { Injectable } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { APIFootballHttpService } from 'src/common/service/api-football-http.service';
import { mockFixtures } from 'src/common/mock-data/fixtures';
@Injectable()
export class FixturesService {
  private fixtures: any[];
  constructor(
    private readonly apiFootballHttpService: APIFootballHttpService,
  ) {}
  async getFixtures(date: string) {
    try {
      // const response = await firstValueFrom(
      //   this.apiFootballHttpService.get('/fixtures', {
      //     date,
      //   }),
      // );

      const response: any = await firstValueFrom(of(mockFixtures));
      return response;
    } catch (error) {
      throw new Error('Failed to fetch fixtures');
    }
  }
}
