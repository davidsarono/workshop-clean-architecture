"use server";

import { getInjection } from "@/di/container";
import { encodedRedirect } from "@/lib/utils";
import { AuthenticationError } from "@/src/entities/errors/auth";
import { InputParseError } from "@/src/entities/errors/common";
import { Session } from "@/src/entities/models/session";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  try {
    const signUpController = getInjection("ISignUpController");
    await signUpController({
      email,
      password,
    });
  } catch (err) {
    let error = (err as Error).message;
    if (err instanceof InputParseError) {
      error = "Invalid data. Make sure the Password and Confirm Password match.";
    }
    if (err instanceof AuthenticationError) {
      error = err.message;
    }

    return encodedRedirect(
      "error",
      "/sign-up",
      "An error happened. The developers have been notified. Please try again later. Message: " + error,
    );
  }

  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  let sessionCookie: Session;
  try {
    const signInController = getInjection("ISignInController");
    sessionCookie = await signInController({ email, password });
  } catch (err) {
    let error = (err as Error).message;
    if (
      err instanceof InputParseError ||
      err instanceof AuthenticationError
    ) {
      error = "Incorrect email or password";
    }

    return encodedRedirect(
      "error",
      "/sign-in",
      "An error happened. The developers have been notified. Please try again later.",
    );
  }

  return redirect("/protected");
}

export const signOutAction = async () => {
  try {
    const signOutController = getInjection("ISignOutController");
    await signOutController();
  } catch (err) {
    return encodedRedirect(
      "error",
      "/protected",
      "An error happened.",
    );
  }
  return redirect("/sign-in");
};
