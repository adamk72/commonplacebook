import { Dispatch } from "react"

import { SignUpInAction, SignUpInState } from "@/lib/reducers/signUpInReducer"

import { stateConfig } from "./SignUpIn"

const ToggleClause = ({
  dispatch,
  state,
}: {
  dispatch: Dispatch<SignUpInAction>
  state: SignUpInState
}) => {
  return (
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
  )
}

export default ToggleClause
