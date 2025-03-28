import { forwardRef, Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { FixturesModule } from 'src/fixtures/fixtures.module';

@Module({
  imports: [forwardRef(() => FixturesModule)], // ✅ ใช้ FixturesModule ในการดึง API ภายนอก
  providers: [LeaguesService],
  controllers: [LeaguesController],
  exports: [LeaguesService], // ✅ Export LeaguesService เพื่อให้สามารถใช้ได้ในโมดูลอื่น
})
export class LeaguesModule {}
