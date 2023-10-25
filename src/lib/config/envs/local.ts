import { defineConfig } from "../defineConfig"

export const defaultConfig = {
  apiURL: "http://localhost:1337",
  strapi: {
    passwordMinLength: 6,
  },
}

export function createLocalConfig() {
  return defineConfig(defaultConfig)
}
