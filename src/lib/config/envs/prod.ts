import { defineConfig } from "../defineConfig"
import { defaultConfig } from "./local"
export function createProdConfig() {
  return defineConfig({
    ...defaultConfig,
    apiURL: "https://api.mydomain.com", // TBD
  })
}
