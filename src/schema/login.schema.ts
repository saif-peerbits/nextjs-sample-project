import { z } from "zod";

// Define the login schema using Zod
const createLoginSchema = (t: (key: string) => string) => {
  return z.object({
    userName: z.string().min(1, t('USERNAME_IS_REQUIRED')),
    password: z.string().min(6, t('PASSWORD_MUST_BE_AT_LEAST_SIX_CHARACTERS_LONG')),
  });
};

export { createLoginSchema };
