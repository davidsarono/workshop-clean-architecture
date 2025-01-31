import { z } from 'zod';

import { ISignInUseCase } from '@/src/application/use-cases/auth/sign-in.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { Session } from '@/src/entities/models/session';

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(31),
});

export type ISignInController = ReturnType<typeof signInController>;

export const signInController =
  (
    signInUseCase: ISignInUseCase
  ) =>
    async (input: Partial<z.infer<typeof inputSchema>>): Promise<Session> => {
      const { data, error: inputParseError } = inputSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      const { session } = await signInUseCase(data);
      return session;
    };
