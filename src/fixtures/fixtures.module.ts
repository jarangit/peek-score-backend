import { Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { HttpModule } from '@nestjs/axios';
import { APIFootballHttpService } from 'src/common/service/api-football-http.service';
import { LeaguesService } from 'src/leagues/leagues.service';

@Module({
  imports: [HttpModule], // ✅ ใช้ HttpModule ในการดึง API ภายนอก
  providers: [FixturesService, APIFootballHttpService, LeaguesService],
  controllers: [FixturesController],
})
export class FixturesModule {}
