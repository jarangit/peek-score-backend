import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly esService: ElasticsearchService) {}

  @Post('index')
  async indexData(@Body() body: { index: string; id: string; data: any }) {
    return this.esService.indexData(body.index, body.id, body.data);
  }

  @Get('search/:index')
  async search(@Param('index') index: string, @Body() body: any) {
    return this.esService.search(index, body);
  }
}
