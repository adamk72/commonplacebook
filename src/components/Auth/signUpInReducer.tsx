import { enqueueSnackbar } from "notistack"

const snackbarAction = (snackbarId: string | number) => (
  <button
    onClick={() => {
      alert(`I belong to snackbar with id ${snackbarId}`)
    }}
  ></button>
)
export type SignUpInAction =
  | { type: "loading"; message: string }
  | { type: "success" }
  | { type: "toggle" }
  | { type: "error"; message: string }

type Mode = "signUp" | "signIn"

export type SignUpInState = {
  loading: boolean
  mode: Mode
}

export const signUpInReducerDefault: SignUpInState = {
  loading: false,
  mode: "signIn",
}

export const signUpInReducer = (
  state: SignUpInState,
  action: SignUpInAction
) => {
  switch (action.type) {
    case "success":
      return { ...state, loading: false }
    case "loading": {
      enqueueSnackbar(action.message, { variant: "default" })
      return { ...state, loading: true }
    }
    case "toggle": {
      const mode: Mode = state.mode === "signIn" ? "signUp" : "signIn"
      return { ...state, mode }
    }
    case "error": {
      enqueueSnackbar(action.message, {
        variant: "error",
        action: snackbarAction,
      })
      return { ...state, loading: false }
    }
    default:
      throw Error("Unknown action.")
  }
}

/**
 * FOR LATER CONSIDERATION TO MAKE THIS MORE ROBUST (and better understand TypeScript)
 */

/**
 * Follow with https://youtu.be/jjMbPt_H3RQ?si=BgwmQ47uiJT4Zt9F&t=381
 */
// const SIGN_UP_IN_OPTION = {
//   LOADING: "Loading",
//   REGISTER: "Register"
// } as const

// type SignUpInAction = {
//   type: keyof typeof SIGN_UP_IN_OPTION;
// }
