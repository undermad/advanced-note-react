import { NoteType } from "../NoteFileSystemTypes.ts";
import { FileIcon } from "@radix-ui/react-icons";
import { useDraggable } from "@dnd-kit/core";

type NoteProps = {
  note: NoteType
}

const Note = ({ note }: NoteProps) => {

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: note.id,
    data: {
      parentId: note.parentId,
      type: 'NoteType',
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined;

  return <>
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={"cursor-pointer pl-4 pt-1 w-fit"}
      style={style}
    >
      <div className={"flex gap-1 items-center px-2"}>
        <FileIcon width={16} height={16} />
        {note.fileName}
      </div>
    </div>
  </>;
};

export default Note;