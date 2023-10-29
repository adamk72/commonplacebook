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

export type SignUpInFields = {
  email: string
  password: string
  confirm?: string
}

export const SignUpInPanel = () => {
  const [state, dispatch] = useReducer(signUpInReducer, signUpInReducerDefault)
  const { isSuccess } = useUserAuth()

  if (isSuccess) return <></>

  return (
    <>
      {/* Use of `!isSuccess required to prevent "Cannot update during an existing state transition"
          error (on FormSurfaceWithTitle element). See https://react.dev/learn/keeping-components-pure for more info. */}
      {!isSuccess && (
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
      )}
    </>
  )
}
