export type SignUpInAction = {
  type: "loading" | "success" | "toggle"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

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
    case "loading":
      return { ...state, loading: true }
    case "toggle": {
      const mode: Mode = state.mode === "signIn" ? "signUp" : "signIn"
      return { ...state, mode }
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
