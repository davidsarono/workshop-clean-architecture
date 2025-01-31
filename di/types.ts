import { INotesRepository } from "@/src/application/repositories/notes.repository.interface";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { ISignInUseCase } from "@/src/application/use-cases/auth/sign-in.use-case";
import { ISignOutUseCase } from "@/src/application/use-cases/auth/sign-out.use-case";
import { ISignUpUseCase } from "@/src/application/use-cases/auth/sign-up.use-case";
import { ICreateNoteUseCase } from "@/src/application/use-cases/note/create-note.use-case";
import { IGetNotesUseCase } from "@/src/application/use-cases/note/get-notes.use-case";
import { IUpdateNoteUseCase } from "@/src/application/use-cases/note/update-note.use-case";
import { ISignInController } from "@/src/interface/auth/sign-in.controller";
import { ISignOutController } from "@/src/interface/auth/sign-out.controller";
import { ISignUpController } from "@/src/interface/auth/sign-up.controller";
import { ICreateNoteController } from "@/src/interface/note/create-note.controller";
import { IGetNotesController } from "@/src/interface/note/get-notes.controller";

export const DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),

  // Repositories
  INotesRepository: Symbol.for('INotesRepository'),
  IUsersRepository: Symbol.for('IUsersRepository'),

  // Use Cases
  ICreateNoteUseCase: Symbol.for('ICreateNoteUseCase'),
  IGetNotesUseCase: Symbol.for('IGetNotesUseCase'),
  IUpdateNoteUseCase: Symbol.for('IUpdateNoteUseCase'),
  ISignInUseCase: Symbol.for('ISignInUseCase'),
  ISignOutUseCase: Symbol.for('ISignOutUseCase'),
  ISignUpUseCase: Symbol.for('ISignUpUseCase'),

  // Controllers
  ICreateNoteController: Symbol.for('ICreateNoteController'),
  IGetNotesController: Symbol.for('IGetNotesController'),
  // IUpdateNoteController: Symbol.for('IUpdateNoteController'),
  ISignInController: Symbol.for('ISignInController'),
  ISignOutController: Symbol.for('ISignOutController'),
  ISignUpController: Symbol.for('ISignUpController'),
};

export interface DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;

  // Repositories
  INotesRepository: INotesRepository;
  IUsersRepository: IUsersRepository;

  // Use Cases
  ICreateNoteUseCase: ICreateNoteUseCase;
  IGetNotesUseCase: IGetNotesUseCase;
  IUpdateNoteUseCase: IUpdateNoteUseCase;
  ISignInUseCase: ISignInUseCase;
  ISignOutUseCase: ISignOutUseCase;
  ISignUpUseCase: ISignUpUseCase;

  // Controllers
  ICreateNoteController: ICreateNoteController;
  IGetNotesController: IGetNotesController;
  // IUpdateNoteController: IUpdateNoteController;
  ISignInController: ISignInController;
  ISignOutController: ISignOutController;
  ISignUpController: ISignUpController;
}