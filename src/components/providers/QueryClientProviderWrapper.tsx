"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ReactChildren } from "@/lib/types"

const queryClient = new QueryClient()

const QueryClientProviderWrapper = ({ children }: ReactChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryClientProviderWrapper
