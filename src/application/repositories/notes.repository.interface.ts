import type { Note, NoteInsert } from '@/src/entities/models/note';

export interface INotesRepository {
  createNote(note: NoteInsert): Promise<Note>;
  getNote(id: number): Promise<Note | undefined>;
  getNotes(userId: string): Promise<Note[]>;
  updateNote(id: number, input: Partial<NoteInsert>): Promise<Note>;
  deleteNote(id: number): Promise<void>;
}
