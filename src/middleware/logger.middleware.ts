import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Incoming Request: ${req.method} ${req.originalUrl} ${req.ip}`);

    // Log headers to see if Content-Type is correct
    this.logger.debug(`Headers: ${JSON.stringify(req.headers)}`);

    res.on('finish', () => {
      this.logger.log(`Outgoing Response: ${req.method} ${req.originalUrl} ${res.statusCode} - ${res.get('content-length')} ${req.ip}`);
    });

    next();
  }
}