import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const UserNoPassword = userSchema.omit({ password: true });

export type User = z.infer<typeof UserNoPassword>;

export const createUserSchema = userSchema
  .pick({ email: true, password: true });

export type CreateUser = z.infer<typeof createUserSchema>;
