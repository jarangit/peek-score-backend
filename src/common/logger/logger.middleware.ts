import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = winston.createLogger({
    transports: [
      new ElasticsearchTransport({
        level: 'info',
        clientOpts: { node: 'http://localhost:9200' },
      }),
    ],
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`${req.method} ${req.url}`); // ❌ Error: logger อาจยังไม่ถูกกำหนด
    next();
  }
}
