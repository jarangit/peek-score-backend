import { Module } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchController } from './elasticsearch.controller';

@Module({
  providers: [
    {
      provide: 'ELASTICSEARCH_CLIENT',
      useFactory: () => {
        return new Client({
          node: 'http://localhost:9200',
          auth: { username: 'elastic', password: 'changeme' },
        });
      },
    },
    ElasticsearchService,
  ],
  exports: ['ELASTICSEARCH_CLIENT'],
  controllers: [ElasticsearchController],
})
export class ElasticsearchModule {}
