"use client"
import { zodResolver as zr } from "@hookform/resolvers/zod"
import ky, { HTTPError } from "ky"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ZodType, z } from "zod"

import { FreeDictionaryWord } from "@/lib/types/freeDictionaryWord"

import Button from "./Button"

type JustWord = Partial<FreeDictionaryWord>

export const GrabAWord = () => {
  const [word, setWord] = useState<FreeDictionaryWord>()
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
      const words: FreeDictionaryWord[] = await ky.get(url).json()
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
        <Button type="submit" label="Submit" />
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
