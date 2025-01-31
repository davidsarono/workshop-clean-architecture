import { z } from 'zod';

export const sessionSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date(),
});

export type Session = z.infer<typeof sessionSchema>;
