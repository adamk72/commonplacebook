import { defineConfig } from "../defineConfig"
export function createLocalConfig() {
  return defineConfig({
    apiURL: "http://localhost:1337",
  })
}
