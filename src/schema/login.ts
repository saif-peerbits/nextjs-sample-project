import { z } from "zod";

// Define the login schema using Zod
const loginSchema = z.object({
  userName: z.string().nonempty("Username is required."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export { loginSchema };
