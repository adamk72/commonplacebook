import { ZodType, z } from "zod"

import { appConfig } from "@/lib/config"

import { SignUpInFields } from "./SignUpInPanel"

const baseSchema = {
  email: z.string().email().trim(),
  password: z.string().min(appConfig.strapi.passwordMinLength),
}

export const signUpSchema: ZodType<SignUpInFields> = z
  .object({
    ...baseSchema,
    confirm: z.string(),
  })
  .refine((data) => data.confirm && data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })

export const signInSchema: ZodType<SignUpInFields> = z.object({
  ...baseSchema,
})
