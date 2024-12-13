import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export interface CorsOptionsInterface {
  enabled?: boolean;
  options?: CorsOptions;
}
