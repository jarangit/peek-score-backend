import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FixturesModule } from './fixtures/fixtures.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LeaguesModule } from './leagues/leagues.module';

@Module({
  imports: [
    HttpModule,
    FixturesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LeaguesModule, // ✅ โหลด .env ทั่วระบบ
  ],
  controllers: [AppController],
  providers: [AppService, HttpModule],
})
export class AppModule {}
