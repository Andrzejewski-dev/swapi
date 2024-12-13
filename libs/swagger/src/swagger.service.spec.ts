import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { SwaggerOptionsInterface } from './swagger-options.interface';
import { SWAGGER_OPTIONS_PROVIDER } from './swagger.constants';
import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let app: INestApplication;
  let service: SwaggerService;
  const options: SwaggerOptionsInterface = {
    enabled: true,
    title: 'test',
    version: '0.0.0',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SWAGGER_OPTIONS_PROVIDER,
          useValue: options,
        },
        SwaggerService,
      ],
    }).compile();

    service = module.get<SwaggerService>(SwaggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('init', () => {
    it('should setup swagger', () => {
      SwaggerModule.createDocument = jest.fn();
      SwaggerModule.setup = jest.fn();
      service.init(app);
      expect(SwaggerModule.createDocument).toHaveBeenCalled();
      expect(SwaggerModule.setup).toHaveBeenCalled();
    });

    it('should get options from package.json if options is not provided', () => {
      SwaggerModule.createDocument = jest.fn();
      SwaggerModule.setup = jest.fn();
      delete options.title;
      delete options.version;
      service.init(app);
      expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
        app,
        expect.objectContaining({
          info: expect.objectContaining({
            title: process.env.npm_package_name,
            version: process.env.npm_package_version,
          }),
        }),
      );
      expect(SwaggerModule.setup).toHaveBeenCalled();
    });

    it('should set default options if empty package.json and options is not provided', () => {
      SwaggerModule.createDocument = jest.fn();
      SwaggerModule.setup = jest.fn();
      delete options.title;
      delete options.version;
      delete process.env.npm_package_name;
      delete process.env.npm_package_version;
      service.init(app);
      expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
        app,
        expect.objectContaining({
          info: expect.objectContaining({
            title: 'App name',
            version: '0.0.0',
          }),
        }),
      );
      expect(SwaggerModule.setup).toHaveBeenCalled();
    });

    it('should do nothing if disabled', () => {
      options.enabled = false;
      SwaggerModule.createDocument = jest.fn();
      SwaggerModule.setup = jest.fn();
      service.init(app);
      expect(SwaggerModule.createDocument).not.toHaveBeenCalled();
      expect(SwaggerModule.setup).not.toHaveBeenCalled();
    });
  });
});
