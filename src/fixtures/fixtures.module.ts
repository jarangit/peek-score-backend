import { Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { HttpModule } from '@nestjs/axios';
import { APIFootballHttpService } from 'src/common/service/api-football-http.service';
import { LeaguesService } from 'src/leagues/leagues.service';
import { RedisModule } from 'src/redos/redos.module';
import { RedisService } from 'src/redos/redis.service';

@Module({
  imports: [HttpModule, RedisModule], // ✅ ใช้ HttpModule ในการดึง API ภายนอก
  providers: [FixturesService, APIFootballHttpService, LeaguesService, RedisService],
  controllers: [FixturesController],
})
export class FixturesModule {}
