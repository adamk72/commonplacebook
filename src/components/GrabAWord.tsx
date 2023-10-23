"use client"
import { Word } from '@/data/word'
import { ZodType, z } from 'zod'
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver as zr } from "@hookform/resolvers/zod";

type JustWord = Partial<Word>

export const GrabAWord = () => {

  const schema: ZodType<JustWord> = z.object({
    word: z.string().min(2).max(30)
  })

  const { register, handleSubmit, formState: { errors } } = useForm<JustWord>({ resolver: zr(schema) })

  const handleValidatedData: SubmitHandler<JustWord> = (data) => {
    console.log(`got the word «${data.word}»`)
  }

  return (
    <div>
      <h1>GrabAWord</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(handleValidatedData)}>
        <label>What word should I grab?</label>
        <input type="text" {...register("word")} />
        {errors.word && <span className='text-red-900'>{errors.word.message}</span>}
        <input type="submit" className='btn' />
      </form>
    </div>
  )
}
