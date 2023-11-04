import { stateConfig } from "./stateConfig"

import {
  SignUpInAction,
  SignUpInState,
} from "@/components/signUpIn/signUpInReducer"
import { DispatchProps } from "@/lib/types"

const ToggleClause = ({
  dispatch,
  state,
}: DispatchProps<SignUpInAction, SignUpInState>) => {
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
