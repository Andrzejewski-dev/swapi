import { registerAs } from '@nestjs/config';
import { render } from 'ejs';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = '../app-config.yaml';

export const config = registerAs('config', () => {
  const configTemplate = readFileSync(
    join(__dirname, YAML_CONFIG_FILENAME),
    'utf8',
  );

  return yaml.load(render(configTemplate)) as Record<string, any>;
});
