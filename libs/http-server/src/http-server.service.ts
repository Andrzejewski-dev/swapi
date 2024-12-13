import { Inject, Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createServer as createServerSSL } from 'https';

import { HttpServerOptionsInterface } from './http-server-options.interface';
import { HTTP_SERVER_OPTIONS_PROVIDER } from './http-server.constants';

@Injectable()
export class HttpServerService {
  private readonly logger = new Logger(HttpServerService.name);

  constructor(
    @Inject(HTTP_SERVER_OPTIONS_PROVIDER)
    private readonly options: HttpServerOptionsInterface,
  ) {}

  run(server: Express): void {
    if (this.options.http?.enabled) {
      createServer(server).listen(this.options.http.port, () => {
        this.logger.log(`HTTP server run on port ${this.options.http.port}`);
      });
    }

    if (this.options.https?.enabled) {
      createServerSSL(
        {
          key: readFileSync(this.options.https.certKeyPath),
          cert: readFileSync(this.options.https.certPath),
        },
        server,
      ).listen(this.options.https.port, () => {
        this.logger.log(`HTTPS server run on port ${this.options.https?.port}`);
      });
    }
  }
}
