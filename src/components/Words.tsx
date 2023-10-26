import { promises as fs } from "fs"

import { Word } from "@/data/word"

export default async function Words() {
  const file = await fs.readFile(process.cwd() + "/src/data/words.json", "utf8")
  const words = JSON.parse(file)

  return (
    <>
      <ul>
        {words &&
          words.map((word: Word) => (
            <li key={word.word}>
              {word.word} =&gt; {word.phonetic}r
            </li>
          ))}
      </ul>
    </>
  )
}
