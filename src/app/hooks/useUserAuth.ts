"use client"
import { useQueryClient } from "@tanstack/react-query"

import { QUERY_KEY } from "@/lib/constants"

export const useUserAuth = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData([QUERY_KEY.user])
  return data
}
