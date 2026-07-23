import { z } from 'zod';
const passwordMessage =
  'Password must contain:\n\u2022 Minimum 8 characters\n\u2022 One uppercase letter\n\u2022 One lowercase letter\n\u2022 One number';
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email ID'),
  password: z.string().min(1, 'Password is required'),
});
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[A-Za-z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  email: z.string().min(1, 'Email is required').email('Invalid email ID'),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, passwordMessage),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
