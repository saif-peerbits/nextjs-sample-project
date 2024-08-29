import { z } from "zod";

// Define the login schema using Zod
const loginSchema = z.object({
  userName: z.string({
    required_error: "Please enter username.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export { loginSchema };
