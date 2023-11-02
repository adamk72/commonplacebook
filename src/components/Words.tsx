import { promises as fs } from "fs"

import { FreeDictionaryWord } from "@/data/freeDictionaryWord"

export default async function Words() {
  const file = await fs.readFile(
    process.cwd() + "/src/data/freeDictionaryWords.json",
    "utf8"
  )
  const words = JSON.parse(file)

  return (
    <>
      <ul>
        {words &&
          words.map((word: FreeDictionaryWord) => (
            <li key={word.word}>
              {word.word} =&gt; {word.phonetic}
            </li>
          ))}
      </ul>
    </>
  )
}
