import { defaultConfig } from './local';
import { defineConfig } from '../defineConfig';
export function createProdConfig() {
  return defineConfig({
    ...defaultConfig,
    apiURL: 'https://api.mydomain.com', // TBD
  });
}
