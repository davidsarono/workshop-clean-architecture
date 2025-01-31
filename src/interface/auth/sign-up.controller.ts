import { z } from 'zod';

import { ISignUpUseCase } from '@/src/application/use-cases/auth/sign-up.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { User } from '@/src/entities/models/user';

const inputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(31),
});

export type ISignUpController = ReturnType<typeof signUpController>;

export const signUpController =
  (
    signUpUseCase: ISignUpUseCase
  ) =>
    async (input: Partial<z.infer<typeof inputSchema>>): Promise<User> => {
      const { data, error: inputParseError } = inputSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('Invalid data', { cause: inputParseError });
      }

      const { user } = await signUpUseCase(data);
      return user;
    };
