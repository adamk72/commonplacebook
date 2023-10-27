import { zodResolver } from "@hookform/resolvers/zod"
import jwtDecode, { JwtPayload } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { SubmitHandler, useForm } from "react-hook-form"

import { useSignUpInQuery } from "@/app/hooks/useSignUpInQuery"
import {
  SignUpInAction,
  SignUpInState,
} from "@/components/Auth/signUpInReducer"
import { JWT_AUTH_NAME, MILLISECONDS_IN_SECOND } from "@/lib/constants"
import { DispatchProps } from "@/lib/types"

import LabelAndField from "./LabelAndField"
import { SignUpIn } from "./SignUpIn"
import { stateConfig } from "./stateConfig"
import Button from "../Button"

const SignUpInForm = ({
  dispatch,
  state,
}: DispatchProps<SignUpInAction, SignUpInState>) => {
  const [, setCookie] = useCookies([JWT_AUTH_NAME])
  const {
    signUpInResponse,
    userSignUpIn,
    signUpInSuccessful,
    userSignUpInError,
  } = useSignUpInQuery()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors: fErrors },
  } = useForm<SignUpIn>({
    resolver: zodResolver(stateConfig[state.mode].schema),
  })

  useEffect(() => {
    if (signUpInSuccessful) {
      const jwt = signUpInResponse!.jwt
      const decoded: JwtPayload = jwtDecode(jwt)

      if (decoded?.exp)
        setCookie(JWT_AUTH_NAME, jwt, {
          expires: new Date(decoded.exp * MILLISECONDS_IN_SECOND),
        })
      else setCookie(JWT_AUTH_NAME, jwt)

      dispatch({ type: "success" })
      router.push("/about")
    } else if (userSignUpInError) {
      dispatch({
        type: "error",
        message: userSignUpInError.message,
      })
    }
  }, [
    dispatch,
    router,
    setCookie,
    signUpInResponse,
    signUpInSuccessful,
    userSignUpInError,
  ])

  const handleValidatedInput: SubmitHandler<SignUpIn> = async (data) => {
    dispatch({
      type: "loading",
      message: "Loading...",
    })
    const { email, password } = data
    userSignUpIn({
      path: stateConfig[state.mode].authPath,
      json: stateConfig[state.mode].authJson(email, password),
    })
  }

  return (
    <form onSubmit={handleSubmit(handleValidatedInput)}>
      <LabelAndField
        errors={fErrors}
        label="Email Address"
        name="email"
        placeholder="you@company.com"
        register={register}
        type="email"
      />
      <LabelAndField
        errors={fErrors}
        label="Password"
        labelLink={stateConfig[state.mode].labelLink}
        name="password"
        placeholder="Your Password"
        register={register}
        type="password"
      />
      {state.mode === "signUp" && (
        <LabelAndField
          errors={fErrors}
          label="Confirm Password"
          name="confirm"
          placeholder="Your Password"
          register={register}
          type="password"
        />
      )}
      <Button type="submit" label={stateConfig[state.mode].title} />
    </form>
  )
}

export default SignUpInForm
