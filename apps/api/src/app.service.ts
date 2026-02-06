import { Injectable } from '@nestjs/common';
import type { Id } from '@motori/shared-types';

@Injectable()
export class AppService {
  getHello(): object {
    const exampleId: Id = '1';
    return {
      message: 'Hello Motori!',
      exampleId,
      timestamp: new Date().toISOString(),
      version: '0.0.0',
    };
  }
}
