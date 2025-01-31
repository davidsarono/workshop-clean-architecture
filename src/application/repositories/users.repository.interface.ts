import type { User, CreateUser } from '@/src/entities/models/user';

export interface IUsersRepository {
  getUser(): Promise<User | undefined>;
}
