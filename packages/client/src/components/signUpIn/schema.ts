import { ZodType, z } from 'zod';

import { SignUpInFields } from './SignUpInPanel';

import { appConfig } from '@/lib/config';

const baseSchema = {
  email: z.string().email().trim(),
  password: z.string().min(appConfig.strapi.passwordMinLength),
};

export const signUpSchema: ZodType<SignUpInFields> = z
  .object({
    ...baseSchema,
    confirm: z.string(),
  })
  .refine((data) => data.confirm && data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  });

export const signInSchema: ZodType<SignUpInFields> = z.object({
  ...baseSchema,
});
