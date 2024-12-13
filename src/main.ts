import * as express from 'express';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { CorsService } from '@swapi/cors';
import { HttpServerService } from '@swapi/http-server';
import { SwaggerService } from '@swapi/swagger';

import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  ConfigModule.forRoot();
  const server = express();
  const options = config();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register(options),
    new ExpressAdapter(server),
    {
      logger:
        options.log.enabled &&
        WinstonModule.createLogger({
          level: options.log.level,
          transports: [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.ms(),
                nestWinstonModuleUtilities.format.nestLike(options.app.name),
              ),
            }),
          ],
        }),
    },
  );
  app.get(CorsService).init(app);
  app.get(SwaggerService).init(app);
  app.get(HttpServerService).run(server);
  await app.init();
}
bootstrap();
