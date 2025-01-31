import { z } from 'zod';

import { ICreateNoteUseCase } from '@/src/application/use-cases/note/create-note.use-case';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { InputParseError } from '@/src/entities/errors/common';
import { Note } from '@/src/entities/models/note';

function presenter(
  notes: Note,
) {
  return {
    id: notes.id,
    description: notes.description,
    hasRead: notes.hasRead,
    userId: notes.userId,
  }
}

const inputSchema = z.object({ description: z.string().min(4) });

export type ICreateNoteController = ReturnType<typeof createNoteController>;

export const createNoteController =
  (
    createNoteUseCase: ICreateNoteUseCase
  ) =>
    async (
      input: Partial<z.infer<typeof inputSchema>>,
      userId: string | undefined
    ): Promise<ReturnType<typeof presenter>> => {
      if (!userId) {
        throw new UnauthenticatedError('Must be logged in to create a note');
      }

      const { data, error: inputParseError } = inputSchema.safeParse(input);

      if (inputParseError) {
        throw new InputParseError('' + inputParseError.formErrors.fieldErrors.description?.join(', '), { cause: inputParseError });
      }

      const note = await createNoteUseCase({ description: data.description }, userId)

      return presenter(note);
    };
