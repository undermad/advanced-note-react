import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import { CiFileOn } from "react-icons/ci";

type NoteProps = {
  note: FileTreeNode
}

const Note = ({ note }: NoteProps) => {

  if (!note || !note.depth) {
    return null;
  }

  const style = {
    marginLeft: note.depth * 20,
    transition: '0.1s ease-in',
  }

  return <div className={`pl-2 flex gap-1 items-center text-lg select-none`} style={style}>
    <CiFileOn size={16} />
    {note.name}
  </div>;
};

export default Note;