import { INotesRepository } from "@/src/application/repositories/notes.repository.interface";
import { NoteInsert, Note } from "@/src/entities/models/note";
import { createClient } from "@/supabase/server";

export class NotesRepository implements INotesRepository {
  constructor() { }

  async createNote(note: NoteInsert): Promise<Note> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('notes').insert({
      description: note.description,
      has_read: false,
      user_id: note.userId,
    }).select();

    if (error) {
      throw error;
    }

    const item = data[0];

    return {
      id: item.id as number,
      description: item.description,
      hasRead: item.hasRead,
      userId: item.userId,
    };
  }

  async getNote(id: number): Promise<Note | undefined> {
    throw new Error("Method not implemented.");
  }

  async getNotes(userId: string): Promise<Note[]> {
    const supabase = await createClient();
    const { data, error } = await supabase.from('notes').select().eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data;
  }

  async updateNote(id: number, input: Partial<NoteInsert>): Promise<Note> {
    throw new Error("Method not implemented.");
  }

  async deleteNote(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}