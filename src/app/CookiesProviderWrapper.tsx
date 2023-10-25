"use client"
import { CookiesProvider } from "react-cookie"

const CookiesProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <CookiesProvider>{children}</CookiesProvider>
}

export default CookiesProviderWrapper
