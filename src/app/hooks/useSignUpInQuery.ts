import { useMutation, useQueryClient } from "@tanstack/react-query"
import ky, { HTTPError } from "ky"

import { appConfig } from "@/lib/config"
import { QUERY_KEY } from "@/lib/constants"
import { StrapiRegisteredUser } from "@/lib/types"

type SignUpInQuery = {
  path: string
  json:
    | {
        identifier: string
        password: string
      }
    | {
        username: string
        email: string
        password: string
      }
}
const signUpInFetch = async ({ path, json }: SignUpInQuery) => {
  try {
    const { jwt, user } = (await ky
      .post(appConfig.apiURL + path, { json })
      .json()) as { jwt: string; user: StrapiRegisteredUser }
    return { jwt, user }
  } catch (error) {
    if (error instanceof HTTPError && error.name === "HTTPError") {
      const res = await error.response.json()
      throw new Error(res.error.message)
    }
  }
}

export const useSignUpInQuery = () => {
  const queryClient = useQueryClient()

  const {
    data: signUpInResponse,
    isSuccess: signUpInSuccessful,
    mutate: userSignUpIn,
    error: userSignUpInError,
  } = useMutation({
    mutationFn: (query: SignUpInQuery) => signUpInFetch(query),
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.user], data)
    },
  })

  return {
    signUpInResponse,
    userSignUpIn,
    signUpInSuccessful,
    userSignUpInError,
  }
}
