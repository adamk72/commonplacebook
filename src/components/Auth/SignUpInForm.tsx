import React, { Dispatch } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { appConfig } from "@/lib/config"
import Button from "../Button"
import LabelAndField from "./LabelAndField"
import ky, { HTTPError } from "ky"
import jwtDecode, { JwtPayload } from "jwt-decode"
import { StrapiRegisteredUser } from "@/lib/types"
import { schema } from "./schema"
import { JWT_AUTH_NAME, MILLISECONDS_IN_SECOND } from "@/lib/constants"
import { useCookies } from "react-cookie"
import { SignUpIn, stateConfig } from "./SignUpIn"
import { SignUpInAction, SignUpInState } from "@/lib/reducers/signUpIn"

const SignUpInForm = ({
  dispatch,
  state,
}: {
  dispatch: Dispatch<SignUpInAction>
  state: SignUpInState
}) => {
  const [_cookies, setCookie] = useCookies([JWT_AUTH_NAME])

  const {
    register,
    handleSubmit,
    formState: { errors: fErrors },
  } = useForm<SignUpIn>({ resolver: zodResolver(schema) })

  const handleValidatedInput: SubmitHandler<SignUpIn> = async (data) => {
    dispatch({ type: "loading" })
    const { email, password } = data
    try {
      const { jwt } = (await ky
        .post(appConfig.apiURL + "/api/auth/local/register", {
          json: { username: email, email, password },
        })
        .json()) as { jwt: string; user: StrapiRegisteredUser }
      const decoded: JwtPayload = jwtDecode(jwt)

      if (decoded?.exp)
        setCookie(JWT_AUTH_NAME, jwt, {
          expires: new Date(decoded.exp * MILLISECONDS_IN_SECOND),
        })
      else setCookie(JWT_AUTH_NAME, jwt)

      dispatch({ type: "success" })
    } catch (error) {
      if (error instanceof HTTPError && error.name === "HTTPError") {
        console.error(await error.response.json())
      }
    }
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
