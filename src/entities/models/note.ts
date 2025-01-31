import { z } from 'zod';

export const selectNoteSchema = z.object({
  id: z.number(),
  description: z.string(),
  hasRead: z.boolean(),
  userId: z.string(),
});
export type Note = z.infer<typeof selectNoteSchema>;

export const insertNoteSchema = selectNoteSchema.pick({
  description: true,
  userId: true,
  hasRead: true,
});

export type NoteInsert = z.infer<typeof insertNoteSchema>;
