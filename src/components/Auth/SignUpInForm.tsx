import { zodResolver } from "@hookform/resolvers/zod"
import jwtDecode, { JwtPayload } from "jwt-decode"
import ky, { HTTPError } from "ky"
import { useCookies } from "react-cookie"
import { SubmitHandler, useForm } from "react-hook-form"

import { appConfig } from "@/lib/config"
import { JWT_AUTH_NAME, MILLISECONDS_IN_SECOND } from "@/lib/constants"
import { SignUpInAction, SignUpInState } from "@/lib/reducers/signUpInReducer"
import { DispatchProps, StrapiRegisteredUser } from "@/lib/types"

import LabelAndField from "./LabelAndField"
import { SignUpIn, stateConfig } from "./SignUpIn"
import Button from "../Button"

const SignUpInForm = ({
  dispatch,
  state,
}: DispatchProps<SignUpInAction, SignUpInState>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cookies, setCookie] = useCookies([JWT_AUTH_NAME])

  const {
    register,
    handleSubmit,
    formState: { errors: fErrors },
  } = useForm<SignUpIn>({
    resolver: zodResolver(stateConfig[state.mode].schema),
  })

  const handleValidatedInput: SubmitHandler<SignUpIn> = async (data) => {
    dispatch({ type: "loading" })
    const { email, password } = data
    try {
      const { jwt } = (await ky
        .post(appConfig.apiURL + stateConfig[state.mode].authPath, {
          json: stateConfig[state.mode].authJson(email, password),
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
