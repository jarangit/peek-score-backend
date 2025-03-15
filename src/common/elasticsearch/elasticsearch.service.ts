import { Inject, Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(
    @Inject('ELASTICSEARCH_CLIENT') private readonly esClient: Client,
  ) {}

  async indexData(index: string, id: string, data: any) {
    return this.esClient.index({
      index,
      id,
      body: data,
    });
  }

  async search(index: string, query: any) {
    return this.esClient.search({
      index,
      body: {
        query,
      },
    });
  }
}
