import { ISignOutUseCase } from '@/src/application/use-cases/auth/sign-out.use-case';

export type ISignOutController = ReturnType<typeof signOutController>;

export const signOutController =
  (
    signOutUseCase: ISignOutUseCase
  ) =>
    async (): Promise<void> => {
      await signOutUseCase();
    };
