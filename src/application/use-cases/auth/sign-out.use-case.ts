import type { IAuthenticationService } from '@/src/application/services/authentication.service.interface';

export type ISignOutUseCase = ReturnType<typeof signOutUseCase>;

export const signOutUseCase =
  (
    authenticationService: IAuthenticationService
  ) =>
    async (): Promise<void> => {
      return await authenticationService.signOut();
    };
