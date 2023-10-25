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
import ky, { HTTPError } from 'ky'

export type SignUpIn = {
  email: string
  password: string
  confirm: string
}
const schema: ZodType<SignUpIn> = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(appConfig.strapi.passwordMinLength),
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
    const { email, password } = data
    try {
      const res = await ky.post(appConfig.apiURL+"/api/auth/local/register", { json: { username: email, email, password}}).json()
      dispatch({ type: "success"})
    } catch (error) {
      if (error instanceof HTTPError && error.name === "HTTPError") {
        console.error(await error.response.json())
      } 
    }
    console.log(appConfig.apiURL+"/api/auth/local/register", data)
  }

  const stateConfig = {
    "signIn": { title: "Sign In", subtitle: "Sign in to access your account", labelLink: <LabelLink text="Forgot password?" href="#!" />, toggleText: "Don't have an account yet?", toggleLink: "Sign up" },
    "signUp": { title: "Sign Up", subtitle: "Sign up with your email", labelLink: <></>, toggleText: "Did you mean to sign in?", toggleLink: "Sign in"}
  }

  return (
    <FormSurface title={stateConfig[state.mode].title} subtitle={stateConfig[state.mode].subtitle}>
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
            labelLink={stateConfig[state.mode].labelLink}
            name="password"
            placeholder="Your Password"
            register={register}
            type="password"
          />
          {state.mode === "signUp" && <LabelAndField
            errors={fErrors}
            label="Confirm Password"
            name="confirm"
            placeholder="Your Password"
            register={register}
            type="password"
          />}
          <Button type="submit" label={stateConfig[state.mode].title} />
        </form>
        <p className="text-sm text-center text-gray-400">
        {stateConfig[state.mode].toggleText}{" "} 
          <a
            className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
            onClick={() => {
              dispatch({ type: "toggle" })
            }}
          >
            {stateConfig[state.mode].toggleLink}
          </a>
          .
        </p>
      </>
    </FormSurface>
  )
}
