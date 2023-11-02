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
  const numRegEx = new RegExp("\\d+")
  const tagRemoval = /(<([^>]+)>)/gi
  const results = Promise.allSettled(
    array.map(async (word) => {
      if (numRegEx.test(word))
        throw new Error("We currently do not accept words with numbers in them")

      try {
        const results = await ky
          .post(appConfig.apiURL + "/api/words", {
            json: {
              data: {
                word: word.replace(tagRemoval, "").replaceAll('"', "").trim(),
              },
            },
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
