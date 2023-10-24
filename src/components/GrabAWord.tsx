"use client"
import { Word } from "@/data/word"
import { ZodType, z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver as zr } from "@hookform/resolvers/zod"
import { useState } from "react"
import ky, { HTTPError } from "ky"

type JustWord = Partial<Word>

export const GrabAWord = () => {
  const [word, setWord] = useState<Word>()
  const [error, setError] = useState<{
    title: string
    message: string
    resolution: string
  }>()

  const schema: ZodType<JustWord> = z.object({
    word: z.string().min(2).max(30),
  })

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<JustWord>({ resolver: zr(schema) })

  const handleValidatedInput: SubmitHandler<JustWord> = async (data) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`
    try {
      const words: Word[] = await ky.get(url).json()
      setWord(words[0])
    } catch (error) {
      setWord(undefined)
      if (error instanceof HTTPError && error.name === "HTTPError") {
        setError(await error.response.json())
      }
    }
  }

  return (
    <div>
      <h1>GrabAWord</h1>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit(handleValidatedInput)}
      >
        <label>What word should I grab?</label>
        <input type="text" {...register("word")} />
        {formErrors.word && (
          <span className="text-red-900">{formErrors.word.message}</span>
        )}
        <input type="submit" className="btn btn-primary" />
      </form>
      {word ? (
        <>
          Got the word: {word.word}. There are {word.meanings.length} meanings.
        </>
      ) : (
        error && error.message
      )}
    </div>
  )
}
