"use client"
import LabelLink from "./LabelLink"
import { signInSchema, signUpSchema } from "./schema"

export const stateConfig = {
  signIn: {
    title: "Sign In",
    subtitle: "Sign in to access your account",
    labelLink: <LabelLink text="Forgot password?" href="#!" />,
    toggleText: "Don't have an account yet?",
    toggleLink: "Sign up",
    authPath: "/api/auth/local",
    authJson: (email: string, password: string) => ({
      identifier: email,
      password,
    }),
    schema: signUpSchema,
  },
  signUp: {
    title: "Sign Up",
    subtitle: "Sign up with your email",
    labelLink: <></>,
    toggleText: "Did you mean to sign in?",
    toggleLink: "Sign in",
    authPath: "/api/auth/local/register",
    authJson: (email: string, password: string) => ({
      username: email,
      email,
      password,
    }),
    schema: signInSchema,
  },
}
