import { defineConfig } from "../defineConfig"
export function createProdConfig() {
  return defineConfig({
    apiURL: "https://api.mydomain.com", // TBD
  })
}
