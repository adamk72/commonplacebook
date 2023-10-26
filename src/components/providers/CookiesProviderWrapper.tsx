"use client"
import { CookiesProvider } from "react-cookie"

import { ReactChildren } from "@/lib/types"

const CookiesProviderWrapper = ({ children }: ReactChildren) => {
  return <CookiesProvider>{children}</CookiesProvider>
}

export default CookiesProviderWrapper
