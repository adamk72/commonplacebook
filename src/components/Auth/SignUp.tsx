"use client"
import { FormEvent, useRef } from "react"
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from 'zod';

import Button from "../Button"
import LabelAndField from "./LabelAndField"
import LabelLink from "./LabelLink"

export type SignUpIn = {
  email: string,
  password: string,
  confirm: string,
}
const schema: ZodType<SignUpIn> = z.object({
  email: z.string().email().trim(),
  password: z.string().min(4).max(30),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, { message: "Passwords do not match", path: ["confirm"] })

export const SignUp = () => {
  const { register, handleSubmit, formState: { errors: fErrors } } = useForm<SignUpIn>({ resolver: zodResolver(schema) });

  const handleValidatedInput: SubmitHandler<SignUpIn> = async (data) => {
  }

  return (
    <div className="flex items-center bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Sign in
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <div className="m-7">
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
                labelLink={<LabelLink text="Forgot password?" href="#!" />}
                name="password"
                placeholder="Your Password"
                register={register}
                type="password"
              />
              <LabelAndField
                errors={fErrors}
                label="Confirm Password"
                name="confirm"
                placeholder="Your Password"
                register={register}
                type="password"
              />
              <Button type="submit" label="Sign in" />
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="#!"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
