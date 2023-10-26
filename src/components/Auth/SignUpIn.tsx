"use client"
import { useReducer } from "react"

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

  return (
    <>
      <FormSurfaceWithTitle
        title={stateConfig[state.mode].title}
        subtitle={stateConfig[state.mode].subtitle}
      >
        <>
          {state.statusNode}
          <SignUpInForm state={state} dispatch={dispatch} />
          <ToggleClause state={state} dispatch={dispatch} />
        </>
      </FormSurfaceWithTitle>
    </>
  )
}
