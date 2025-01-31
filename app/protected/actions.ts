'use server';

import { getInjection } from "@/di/container";
import { encodedRedirect } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getSessionAction() {
  try {
    const authenticationService = getInjection('IAuthenticationService');
    return await authenticationService.validateSession();
  } catch (err) {
    return encodedRedirect(
      "error",
      "/protected",
      "An error happened. " + (err as Error).message,
    );
  }
}

export async function getNotesAction(userId: string | undefined) {
  try {
    const getNotesController = getInjection('IGetNotesController');
    return await getNotesController(userId);
  } catch (err) {
    return encodedRedirect(
      "error",
      "/protected",
      "An error happened. " + (err as Error).message,
    );
  }
}

export async function createNoteAction(formData: FormData) {
  const description = formData.get("description")?.toString();
  const userId = formData.get("userId")?.toString();

  try {
    const createNoteController = getInjection('ICreateNoteController');
    await createNoteController({ description }, userId);
  } catch (err) {
    return encodedRedirect(
      "error",
      "/protected",
      "An error happened. " + (err as Error).message,
    );
  }

  redirect("/protected");
}