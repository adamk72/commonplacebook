"use client"
import { useReducer } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodType, z } from "zod"

import { appConfig } from "@/lib/config"

import Button from "../Button"
import LabelAndField from "./LabelAndField"
import LabelLink from "./LabelLink"
import FormSurface from "../FormSurface"
import {
  signUpInReducer,
  signUpInReducerDefault,
} from "@/lib/reducers/signUpIn"

export type SignUpIn = {
  email: string
  password: string
  confirm: string
}
const schema: ZodType<SignUpIn> = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(4).max(30),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })

export const SignUp = () => {
  const [state, dispatch] = useReducer(signUpInReducer, signUpInReducerDefault)
  const {
    register,
    handleSubmit,
    formState: { errors: fErrors },
  } = useForm<SignUpIn>({ resolver: zodResolver(schema) })

  const handleValidatedInput: SubmitHandler<SignUpIn> = async (data) => {
    dispatch({ type: "loading" })
    console.log(appConfig.apiURL)
  }

  return (
    <FormSurface title="Sign in" subtitle="Sign in to access your account">
      <>
        <form onSubmit={handleSubmit(handleValidatedInput)}>
          <LabelAndField
            errors={fErrors}
            label="Email Address"
            name="email"
            placeholder="you@company.com"
            register={register}
            type="email"
          />
          <LabelAndField
            errors={fErrors}
            label="Password"
            labelLink={<LabelLink text="Forgot password?" href="#!" />}
            name="password"
            placeholder="Your Password"
            register={register}
            type="password"
          />
          <LabelAndField
            errors={fErrors}
            label="Confirm Password"
            name="confirm"
            placeholder="Your Password"
            register={register}
            type="password"
          />
          <Button type="submit" label="Sign in" />
        </form>
        <p className="text-sm text-center text-gray-400">
          Don&#x27;t have an account yet?{" "}
          <a
            className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
            onClick={() => {
              dispatch({ type: "toggle" })
            }}
          >
            Sign up
          </a>
          .
        </p>
      </>
    </FormSurface>
  )
}
