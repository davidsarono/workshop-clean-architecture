import { InputParseError, NotFoundError } from '@/src/entities/errors/common';
import type { Note } from '@/src/entities/models/note';
import type { INotesRepository } from '@/src/application/repositories/notes.repository.interface';
import { UnauthorizedError } from '@/src/entities/errors/auth';

export type IUpdateNoteUseCase = ReturnType<typeof updateNoteUseCase>;

export const updateNoteUseCase =
  (
    noteRepository: INotesRepository
  ) =>
    async (
      input: {
        id: number;
        description?: string;
        hasRead?: boolean;
      },
      userId: string
    ): Promise<Note> => {
      const note = await noteRepository.getNote(input.id);

      if (!note) {
        throw new NotFoundError('Note does not exist');
      }

      if (note.userId !== userId) {
        throw new UnauthorizedError(
          'Cannot update note. Reason: unauthorized'
        );
      }

      const newNote = await noteRepository.updateNote(
        input.id,
        {
          description: input.description ?? note.description,
          hasRead: input.hasRead ?? note.hasRead,
          userId,
        }
      );

      return newNote;
    };
