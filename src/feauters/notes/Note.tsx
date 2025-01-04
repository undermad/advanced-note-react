import { NoteType } from "./NoteFileSystemTypes.ts";
import { FileIcon } from "@radix-ui/react-icons";

type NoteProps = {
  note: NoteType
}

const Note = ({ note }: NoteProps) => {
  return <div className={"cursor-pointer pl-4 pt-1 w-fit"}>
    <div className={"flex gap-1 items-center px-2"}>
      <FileIcon width={16} height={16} />
      {note.name}
    </div>
  </div>;
};

export default Note;