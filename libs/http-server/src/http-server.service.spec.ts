import { Express } from 'express';
import { readFileSync } from 'fs';
import { createServer } from 'http';
import { createServer as createServerSSL } from 'https';
import { Test, TestingModule } from '@nestjs/testing';

import { HTTP_SERVER_OPTIONS_PROVIDER } from './http-server.constants';
import { HttpServerOptionsInterface } from './http-server-options.interface';
import { HttpServerService } from './http-server.service';

const listen = jest.fn((port, callback) => callback());

jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen,
  })),
}));

jest.mock('https', () => ({
  createServer: jest.fn(() => ({
    listen,
  })),
}));

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('HttpServerService', () => {
  let service: HttpServerService;

  const mockOptions: HttpServerOptionsInterface = {
    http: { enabled: true, port: 3000 },
    https: {
      enabled: true,
      port: 3443,
      certPath: 'cert.pem',
      certKeyPath: 'key.pem',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpServerService,
        {
          provide: HTTP_SERVER_OPTIONS_PROVIDER,
          useValue: mockOptions,
        },
      ],
    }).compile();

    service = module.get<HttpServerService>(HttpServerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('run', () => {
    it('should initialize HTTP server if HTTP is enabled', () => {
      const mockExpressApp = {} as Express;
      service.run(mockExpressApp);

      expect(createServer).toHaveBeenCalledWith(mockExpressApp);
      expect(listen).toHaveBeenCalledWith(3000, expect.any(Function));
    });

    it('should initialize HTTPS server if HTTPS is enabled', () => {
      const mockExpressApp = {} as Express;

      (readFileSync as jest.Mock).mockImplementation(
        (path: string) => `Mocked content of ${path}`,
      );
      service.run(mockExpressApp);

      expect(readFileSync).toHaveBeenCalledWith('key.pem');
      expect(readFileSync).toHaveBeenCalledWith('cert.pem');

      expect(createServerSSL).toHaveBeenCalledWith(
        {
          key: 'Mocked content of key.pem',
          cert: 'Mocked content of cert.pem',
        },
        mockExpressApp,
      );
      expect(listen).toHaveBeenCalledWith(3443, expect.any(Function));
    });

    it('should not initialize HTTP server if HTTP is disabled', async () => {
      const mockOptionsDisabledHTTP: HttpServerOptionsInterface = {
        ...mockOptions,
        http: { enabled: false, port: 3000 },
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HttpServerService,
          {
            provide: HTTP_SERVER_OPTIONS_PROVIDER,
            useValue: mockOptionsDisabledHTTP,
          },
        ],
      }).compile();

      const serviceWithDisabledHTTP =
        module.get<HttpServerService>(HttpServerService);
      const mockExpressApp = {} as Express;

      serviceWithDisabledHTTP.run(mockExpressApp);

      expect(createServer).not.toHaveBeenCalled();
    });

    it('should not initialize HTTPS server if HTTPS is disabled', async () => {
      const mockOptionsDisabledHTTPS: HttpServerOptionsInterface = {
        ...mockOptions,
        https: {
          enabled: false,
          port: 3443,
          certPath: 'cert.pem',
          certKeyPath: 'key.pem',
        },
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HttpServerService,
          {
            provide: HTTP_SERVER_OPTIONS_PROVIDER,
            useValue: mockOptionsDisabledHTTPS,
          },
        ],
      }).compile();

      const serviceWithDisabledHTTPS =
        module.get<HttpServerService>(HttpServerService);
      const mockExpressApp = {} as Express;

      serviceWithDisabledHTTPS.run(mockExpressApp);

      expect(createServerSSL).not.toHaveBeenCalled();
    });
  });
});
