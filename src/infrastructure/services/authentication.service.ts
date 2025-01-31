import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { Session } from "@/src/entities/models/session";
import { User, CreateUser } from "@/src/entities/models/user";
import { createClient } from "@/supabase/server";

export class AuthenticationService implements IAuthenticationService {
  async signInWithPassword(input: CreateUser): Promise<{ session: Session; user: User; }> {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      throw error;
    }

    if (!data.session) {
      throw new Error("Could not sign in");
    }

    if (!data.user) {
      throw new Error("Could not sign in");
    }

    return {
      session: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        expiresAt: new Date(data.session.expires_at ?? 0),
      },
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
    };
  }

  async signOut(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  async signUp(input: CreateUser): Promise<{ user: User; }> {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    console.log(data);

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error("Could not sign up");
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
    };
  }

  async validateSession(): Promise<{ user: User }> {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error("Could not sign in");
    }

    return {
      user: {
        id: data.user.id,
        email: data.user.email ?? "",
      },
    };
  }
}