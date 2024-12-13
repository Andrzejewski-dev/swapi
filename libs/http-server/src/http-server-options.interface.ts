export interface HttpServerOptionsInterface {
  http?: {
    enabled: boolean;
    port: number;
  };
  https?: {
    enabled: boolean;
    port: number;
    certPath: string;
    certKeyPath: string;
  };
}
