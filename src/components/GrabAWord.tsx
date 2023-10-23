"use client"
import { Word } from '@/data/word'
import { ZodType, z } from 'zod'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver as zr } from "@hookform/resolvers/zod";
import { useState } from 'react';

type JustWord = Partial<Word>

export const GrabAWord = () => {
  const [word, setWord] = useState<Word>();
  const [error, setError] = useState<{title: string, message: string, resolution: string}>();

  const schema: ZodType<JustWord> = z.object({
    word: z.string().min(2).max(30)
  })

  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<JustWord>({ resolver: zr(schema) })

  const handleValidatedData: SubmitHandler<JustWord> = async (data) => {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data.word}`)
      if (!res.ok) {
        setWord(undefined)
        setError(JSON.parse(await res.text()))
        return
      }
      
      const words = await res.json()
      console.info(words[0])
      setWord(words[0])
  }

  return (
    <div>
      <h1>GrabAWord</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(handleValidatedData)}>
        <label>What word should I grab?</label>
        <input type="text" {...register("word")} />
        {formErrors.word && <span className='text-red-900'>{formErrors.word.message}</span>}
        <input type="submit" className='btn btn-primary' />
      </form>
      {word ? <>Got the word: {word.word}. There are {word.meanings.length} meanings.</>  : error && error.message } 
    </div>
  )
}
