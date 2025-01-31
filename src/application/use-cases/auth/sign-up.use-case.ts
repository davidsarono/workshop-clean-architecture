import { User } from '@/src/entities/models/user';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export type ISignUpUseCase = ReturnType<typeof signUpUseCase>;

export const signUpUseCase =
  (
    authenticationService: IAuthenticationService,
  ) =>
    async (input: {
      email: string;
      password: string;
    }): Promise<{ user: User }> => {
      // TODO: Check if user exists
      // const existingUser = await usersRepository.getUserByEmail(input.email);
      // if (existingUser) {
      //   throw new AuthenticationError('email already exists');
      // }

      return await authenticationService.signUp(input);
    };
