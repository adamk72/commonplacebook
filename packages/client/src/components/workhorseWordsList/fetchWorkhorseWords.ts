import { appConfig } from '@/lib/config'
import { CollectionTypeResponse } from '@/lib/types/typeHelpers'
import ky, { HTTPError } from 'ky'

export const getWorkhorseWords = async (jwt: string) => {
  const url = `${appConfig.apiURL}/api/words`
  try {
    const apiWordsList: CollectionTypeResponse<"api::word.word"> = await ky.get(url, {
      headers: { Authorization: `Bearer ${jwt}` },
    }).json()
    const words = apiWordsList.data.map((item) => item.attributes.word)
    return words;
  } catch (error) {
    if (error instanceof HTTPError && error.name === "HTTPError") {
      console.error(await error.response.json())
    }
  }
}
