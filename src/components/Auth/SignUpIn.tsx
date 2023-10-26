"use client"
import { useReducer } from "react"
import LabelLink from "./LabelLink"
import FormSurfaceWithTitle from "../FormSurface"
import {
  signUpInReducer,
  signUpInReducerDefault,
} from "@/lib/reducers/signUpIn"

import SignUpInForm from "./SignUpInForm"

export type SignUpIn = {
  email: string
  password: string
  confirm: string
}

export const stateConfig = {
  signIn: {
    title: "Sign In",
    subtitle: "Sign in to access your account",
    labelLink: <LabelLink text="Forgot password?" href="#!" />,
    toggleText: "Don't have an account yet?",
    toggleLink: "Sign up",
  },
  signUp: {
    title: "Sign Up",
    subtitle: "Sign up with your email",
    labelLink: <></>,
    toggleText: "Did you mean to sign in?",
    toggleLink: "Sign in",
  },
}

export const SignUpIn = () => {
  const [state, dispatch] = useReducer(signUpInReducer, signUpInReducerDefault)

  return (
    <FormSurfaceWithTitle
      title={stateConfig[state.mode].title}
      subtitle={stateConfig[state.mode].subtitle}
    >
      <>
        <SignUpInForm state={state} dispatch={dispatch} />
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
    </FormSurfaceWithTitle>
  )
}
