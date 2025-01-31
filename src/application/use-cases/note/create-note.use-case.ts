import type { Note } from '@/src/entities/models/note';
import type { INotesRepository } from '@/src/application/repositories/notes.repository.interface';

export type ICreateNoteUseCase = ReturnType<typeof createNoteUseCase>;

export const createNoteUseCase =
  (
    noteRepository: INotesRepository
  ) =>
    async (
      input: {
        description: string;
      },
      userId: string
    ): Promise<Note> => {
      const newTodo = await noteRepository.createNote(
        {
          description: input.description,
          userId,
          hasRead: false,
        }
      );

      return newTodo;
    };
