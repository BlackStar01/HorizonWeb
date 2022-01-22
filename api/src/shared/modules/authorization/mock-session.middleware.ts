import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class MockSessionMiddleware implements NestMiddleware {
  public use(req: Request & { session?: object }, res: Response, next: NextFunction): void {
    console.log('mocking session');
    req.session = {};
    next();
  }
}
