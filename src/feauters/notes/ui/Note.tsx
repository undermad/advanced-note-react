import { NoteNode } from "../NoteFileSystemTypes.ts";
import { FileIcon } from "@radix-ui/react-icons";

type NoteProps = {
  note: NoteNode
}

const Note = ({ note }: NoteProps) => {

  if (!note || !note.depth) {
    return null;
  }

  const style = {
    marginLeft: note.depth * 20
  }


  return <div className={`flex gap-1 items-center`} style={style}>
    <FileIcon width={16} height={16} />
    {note.fileName}
  </div>;
};

export default Note;