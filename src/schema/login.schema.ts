import { z } from "zod";


// Define the login schema using Zod
const loginSchema = z.object({
  userName: z.string().min(1, 'USERNAME_IS_REQUIRED'),
  password: z.string().min(6, "PASSWORD_MUST_BE_AT_LEAST_SIX_CHARACTERS_LONG"),
});

export { loginSchema };
