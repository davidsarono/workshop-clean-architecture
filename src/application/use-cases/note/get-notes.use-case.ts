import type { Note } from '@/src/entities/models/note';
import type { INotesRepository } from '@/src/application/repositories/notes.repository.interface';

export type IGetNotesUseCase = ReturnType<typeof getNotesUseCase>;

export const getNotesUseCase =
  (
    notesRepository: INotesRepository
  ) =>
    async (userId: string): Promise<Note[]> => {
      return await notesRepository.getNotes(userId);
    };
