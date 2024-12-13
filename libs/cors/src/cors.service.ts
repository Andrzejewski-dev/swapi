import { INestApplication, Inject, Injectable } from '@nestjs/common';

import { CorsOptionsInterface } from './cors-options.interface';
import { CORS_OPTIONS_PROVIDER } from './cors.constants';

@Injectable()
export class CorsService {
  constructor(
    @Inject(CORS_OPTIONS_PROVIDER)
    private options: CorsOptionsInterface,
  ) {}

  init(app: INestApplication): void {
    if (this.options.enabled) {
      app.enableCors(this.options.options);
    }
  }
}
