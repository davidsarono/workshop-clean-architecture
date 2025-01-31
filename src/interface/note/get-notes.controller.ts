import { IGetNotesUseCase } from '@/src/application/use-cases/note/get-notes.use-case';
import { UnauthenticatedError } from '@/src/entities/errors/auth';
import { Note } from '@/src/entities/models/note';

function presenter(
  notes: Note[],
) {
  return notes.map((t) => ({
    id: t.id,
    description: t.description,
    hasRead: t.hasRead,
    userId: t.userId,
  }));
}

export type IGetNotesController = ReturnType<
  typeof getNotesController
>;

export const getNotesController =
  (
    getNotesUseCase: IGetNotesUseCase
  ) =>
    async (
      userId: string | undefined
    ): Promise<ReturnType<typeof presenter>> => {
      if (!userId) {
        throw new UnauthenticatedError('Must be logged in to create a note');
      }

      const notes = await getNotesUseCase(userId);

      return presenter(notes);
    };
