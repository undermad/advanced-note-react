import { NoteType } from "./NoteFileSystemTypes.ts";
import { FileIcon } from "@radix-ui/react-icons";

type NoteProps = {
  note: NoteType
}

const Note = ({ note }: NoteProps) => {
  return <div className={"pl-1 pt-1 w-fit"}>
    <div className={"flex gap-1 items-center px-2 border border-gray-500 rounded-lg "}>
      <FileIcon />
      {note.name}
    </div>
  </div>;
};

export default Note;