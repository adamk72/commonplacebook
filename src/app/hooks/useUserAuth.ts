"use client"
import { useQueryClient } from "@tanstack/react-query"

import { QUERY_KEY } from "@/lib/constants"
import { StrapiRegisteredUser } from "@/lib/types"

export type User = { jwt: string; user: StrapiRegisteredUser }

export const useUserAuth = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData([QUERY_KEY.user])
  return user as User
}
