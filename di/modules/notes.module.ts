import { createModule } from '@evyweb/ioctopus';

import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';

import { createNoteUseCase } from '@/src/application/use-cases/note/create-note.use-case';
import { getNotesUseCase } from '@/src/application/use-cases/note/get-notes.use-case';
import { updateNoteUseCase } from '@/src/application/use-cases/note/update-note.use-case';

import { createNoteController } from '@/src/interface/note/create-note.controller';
import { getNotesController } from '@/src/interface/note/get-notes.controller';

import { DI_SYMBOLS } from '@/di/types';

export function createNotesModule() {
  const notesModule = createModule();

  notesModule
    .bind(DI_SYMBOLS.INotesRepository)
    .toClass(NotesRepository);

  notesModule
    .bind(DI_SYMBOLS.ICreateNoteUseCase)
    .toHigherOrderFunction(createNoteUseCase, [
      DI_SYMBOLS.INotesRepository,
    ]);

  notesModule
    .bind(DI_SYMBOLS.IGetNotesUseCase)
    .toHigherOrderFunction(getNotesUseCase, [
      DI_SYMBOLS.INotesRepository,
    ]);

  notesModule
    .bind(DI_SYMBOLS.IUpdateNoteUseCase)
    .toHigherOrderFunction(updateNoteUseCase, [
      DI_SYMBOLS.INotesRepository,
    ]);

  notesModule
    .bind(DI_SYMBOLS.ICreateNoteController)
    .toHigherOrderFunction(createNoteController, [
      DI_SYMBOLS.ICreateNoteUseCase,
    ]);

  notesModule
    .bind(DI_SYMBOLS.IGetNotesController)
    .toHigherOrderFunction(getNotesController, [
      DI_SYMBOLS.IGetNotesUseCase,
    ]);

  return notesModule;
}
