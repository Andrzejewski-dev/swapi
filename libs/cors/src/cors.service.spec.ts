import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CORS_OPTIONS_PROVIDER } from './cors.constants';
import { CorsService } from './cors.service';

describe('CorsService', () => {
  let app: INestApplication;
  let service: CorsService;
  const options = {
    enabled: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CORS_OPTIONS_PROVIDER,
          useValue: options,
        },
        CorsService,
      ],
    }).compile();

    service = module.get<CorsService>(CorsService);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('init', () => {
    it('should enable cors', () => {
      app.enableCors = jest.fn();
      service.init(app);
      expect(app.enableCors).toHaveBeenCalled();
    });

    it('should not enable cors if enabled is false', () => {
      options.enabled = false;
      app.enableCors = jest.fn();
      service.init(app);
      expect(app.enableCors).not.toHaveBeenCalled();
    });
  });
});
