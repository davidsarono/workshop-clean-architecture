import { InfoIcon } from "lucide-react";
import { createNoteAction, getNotesAction, getSessionAction } from "./actions";
import { Note } from "@/src/entities/models/note";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button"
import { FormMessage, Message } from "@/components/form-message";;

export default async function ProtectedPage(props: { searchParams: Promise<Message> }) {
  const { user } = await getSessionAction();

  let notes: Note[];
  try {
    notes = await getNotesAction(user.id);
  } catch (err) {
    throw err;
  }

  const searchParams = await props.searchParams;

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <form className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
        <Label htmlFor="description">Description</Label>
        <Input name="description" placeholder="Input your note description" required />
        <Input name="userId" className="hidden" defaultValue={user.id} />
        <SubmitButton pendingText="Submitting..." formAction={createNoteAction}>
          Submit
        </SubmitButton>
        <FormMessage message={searchParams} />
      </form>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your notes</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-96 overflow-auto">
          {JSON.stringify(notes, null, 2)}
        </pre>
      </div>
    </div>
  );
}
