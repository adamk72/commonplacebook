export type SignUpInAction = {
  type: "loading" | "success" | "toggle"
  payload?: any
}

type Mode = "signUp" | "signIn"

type SignUpInState = {
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
    case "loading":
      return { ...state }
    case "toggle":
      const mode: Mode = state.mode === "signIn" ? "signUp" : "signIn"
      return { ...state, mode }
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