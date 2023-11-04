import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { useSignUpInQuery } from "@/app/hooks/useSignUpInQuery"
import {
  SignUpInAction,
  SignUpInState,
} from "@/components/signUpIn/signUpInReducer"
import { DispatchProps } from "@/lib/types"

import LabelAndField from "./LabelAndField"
import { SignUpInFields } from "./SignUpInPanel"
import { stateConfig } from "./stateConfig"
import Button from "../Button"

const SignUpInForm = ({
  dispatch,
  state,
}: DispatchProps<SignUpInAction, SignUpInState>) => {
  const { signUpInResponse, signUpInUserMutate, signUpInUserError } =
    useSignUpInQuery()

  const {
    register,
    handleSubmit,
    formState: { errors: fErrors },
  } = useForm<SignUpInFields>({
    resolver: zodResolver(stateConfig[state.mode].schema),
  })

  useEffect(() => {
    if (signUpInUserError) {
      dispatch({
        type: "error",
        message: signUpInUserError.message,
      })
    }
  }, [dispatch, signUpInResponse, signUpInUserError])

  const handleValidatedInput: SubmitHandler<SignUpInFields> = async (data) => {
    dispatch({
      type: "loading",
      message: "Loading...",
    })
    const { email, password } = data
    signUpInUserMutate({
      path: stateConfig[state.mode].authPath,
      json: stateConfig[state.mode].authJson(email, password),
      dispatch: dispatch,
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
