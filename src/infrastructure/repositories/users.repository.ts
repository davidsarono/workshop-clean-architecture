import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { User } from "@/src/entities/models/user";
import { createClient } from "@/supabase/server";

export class UsersRepository implements IUsersRepository {
  constructor() { }

  async getUser(): Promise<User | undefined> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return {
      id: data.user.id,
      email: data.user.email ?? '',
    };
  }
}