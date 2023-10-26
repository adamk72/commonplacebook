import { ZodType, z } from "zod"
import { SignUpIn } from "./SignUpIn"
import { appConfig } from "@/lib/config"

export const schema: ZodType<SignUpIn> = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(appConfig.strapi.passwordMinLength),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  })
