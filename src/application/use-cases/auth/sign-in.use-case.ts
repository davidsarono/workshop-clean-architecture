import { Session } from '@/src/entities/models/session';
import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export type ISignInUseCase = ReturnType<typeof signInUseCase>;

export const signInUseCase =
  (
    authenticationService: IAuthenticationService
  ) =>
    async (input: {
      email: string;
      password: string;
    }): Promise<{ session: Session }> => {
      return await authenticationService.signInWithPassword(input);
    };
