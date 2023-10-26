"use client"
import { useReducer } from "react"

import {
  signUpInReducer,
  signUpInReducerDefault,
} from "@/lib/reducers/signUpInReducer"

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
      <span>Current State: {stateConfig[state.mode].title}</span>
      <FormSurfaceWithTitle
        title={stateConfig[state.mode].title}
        subtitle={stateConfig[state.mode].subtitle}
      >
        <>
          <SignUpInForm state={state} dispatch={dispatch} />
          <ToggleClause state={state} dispatch={dispatch} />
        </>
      </FormSurfaceWithTitle>
    </>
  )
}
