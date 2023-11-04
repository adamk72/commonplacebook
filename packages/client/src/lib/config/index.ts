// following https://www.raulmelo.me/en/blog/best-practices-for-handling-per-environment-config-js-ts-applications

// might come in use later: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables ("Using App Router" mode)

import { createLocalConfig } from "./envs/local"
import { createProdConfig } from "./envs/prod"
export const appConfig = getConfig()
function getConfig() {
  switch (process.env.NEXT_PUBLIC_APP_ENV) {
    case "production":
      return createProdConfig()
    case "local":
      return createLocalConfig()
    default:
      throw new Error(
        `Invalid NEXT_PUBLIC_APP_ENV "${process.env.NEXT_PUBLIC_APP_ENV}"`
      )
  }
}
