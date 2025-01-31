import { Session } from '@/src/entities/models/session';
import { CreateUser, User } from '@/src/entities/models/user';

export interface IAuthenticationService {
  signInWithPassword(input: CreateUser): Promise<{ session: Session, user: User }>;
  signOut(): Promise<void>;
  signUp(input: CreateUser): Promise<{ user: User }>;
  validateSession(): Promise<{ user: User }>;
}
