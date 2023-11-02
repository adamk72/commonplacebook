import { useMutation } from "@tanstack/react-query"
import ky, { HTTPError } from "ky"
import { useCookies } from "react-cookie"

import { appConfig } from "@/lib/config"
import { JWT_AUTH_NAME } from "@/lib/constants"

const bulkAddWordList = async ({
  array,
  jwt,
}: {
  array: string[]
  jwt: string
}) => {
  const results = Promise.allSettled(
    array.map(async (word) => {
      try {
        const results = await ky
          .post(appConfig.apiURL + "/api/words", {
            json: { data: { word } },
            headers: { Authorization: `Bearer ${jwt}` },
          })
          .json()
        return results
      } catch (error) {
        if (error instanceof HTTPError && error.name === "HTTPError") {
          const res = await error.response.json()
          const message = res.error.message
          throw new Error(message)
        }
      }
    })
  )
  const counts: {
    fulfilled: string[]
    rejected: { word: string; message: string }[]
  } = {
    fulfilled: [],
    rejected: [],
  }

  ;(await results).forEach((res, num) => {
    if (res.status == "fulfilled") {
      counts.fulfilled.push(array[num] ?? "")
    }
    if (res.status == "rejected") {
      counts.rejected.push({
        word: array[num] ?? "",
        message: res.reason.message,
      })
    }
  })
  return counts
}

export const useAddWordsViaArray = () => {
  const [cookies] = useCookies([JWT_AUTH_NAME])
  return useMutation({
    mutationFn: (array: string[]) =>
      bulkAddWordList({ array, jwt: cookies.jwt_authentication }),
  })
}
