import { forwardRef, Module } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixturesController } from './fixtures.controller';
import { HttpModule } from '@nestjs/axios';
import { APIFootballHttpService } from 'src/common/service/api-football-http.service';
import { RedisModule } from 'src/redos/redos.module';
import { EventsGateway } from 'src/web-socket';
import { LeaguesModule } from 'src/leagues/leagues.module';
@Module({
  imports: [HttpModule, RedisModule, forwardRef(() => LeaguesModule)], // ✅ ใช้ HttpModule ในการดึง API ภายนอก
  providers: [FixturesService, APIFootballHttpService, EventsGateway],
  controllers: [FixturesController],
  exports: [FixturesService],
})
export class FixturesModule {}
