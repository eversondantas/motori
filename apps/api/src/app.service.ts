import { Injectable } from '@nestjs/common';
import type { Id } from '@motori/shared-types';

@Injectable()
export class AppService {
  getHello(): string {
    const exampleId: Id = '1';
    return `Hello Motori! (${exampleId})`;
  }
}
