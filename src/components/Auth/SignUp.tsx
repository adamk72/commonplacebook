"use client"
import { FormEvent } from "react"
// import { useForm } from 'react-hook-form';
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ZodType, z } from 'zod';

import Button from "../Button"
import LabelAndField from "./LabelAndField"
import LabelLink from "./LabelLink"

// type SignUpIn = {
//   email: string,
//   password: string,
// }
// const schema: ZodType<SignUpIn> = z.object({
//   email: z.string().email().trim(),
//   password: z.string().
// })

export const SignUp = () => {
  //   const { register, handleSubmit } = useForm({resolver: zodResolver(schema)});

  const handleValidatedInput = (event: FormEvent) => {
    event.preventDefault()
    console.log(event)
  }

  //  const onErrors = (errors) => {

  //  }

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
            <form onSubmit={handleValidatedInput}>
              <LabelAndField
                name="email"
                id="email"
                placeholder="you@company.com"
                type="email"
                label="Email Address"
              />
              <LabelAndField
                name="password"
                id="password"
                type="password"
                placeholder="Your Password"
                label="Password"
                labelLink={<LabelLink text="Forgot password?" href="#!" />}
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
