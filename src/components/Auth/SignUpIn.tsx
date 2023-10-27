"use client"
import { SnackbarProvider } from "notistack"
import { useReducer } from "react"

import { useUserAuth } from "@/app/hooks/useUserAuth"
import {
  signUpInReducer,
  signUpInReducerDefault,
} from "@/components/Auth/signUpInReducer"

import SignUpInForm from "./SignUpInForm"
import { stateConfig } from "./stateConfig"
import ToggleClause from "./ToggleClause"
import FormSurfaceWithTitle from "../FormSurface"

export type SignUpIn = {
  email: string
  password: string
  confirm?: string
}

export const SignUpIn = () => {
  const [state, dispatch] = useReducer(signUpInReducer, signUpInReducerDefault)
  const user = useUserAuth()

  if (user && user.jwt) return <></>

  return (
    <SnackbarProvider maxSnack={1}>
      <FormSurfaceWithTitle
        title={stateConfig[state.mode].title}
        subtitle={stateConfig[state.mode].subtitle}
      >
        <>
          <SignUpInForm state={state} dispatch={dispatch} />
          <ToggleClause state={state} dispatch={dispatch} />
        </>
      </FormSurfaceWithTitle>
    </SnackbarProvider>
  )
}
