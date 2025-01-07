import { FolderType, NoteFileSystemType } from "../NoteFileSystemTypes.ts";
import Note from "./Note.tsx";
import { ArchiveIcon } from "@radix-ui/react-icons";
import { useDraggable, useDroppable } from "@dnd-kit/core";

type FolderProps = {
  folder: FolderType
}

const Folder = ({ folder }: FolderProps) => {
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: folder.id,
    data: {
      accepts: ['FolderType', 'NoteType']
    }
  });
  const {
    setNodeRef: setDraggableNodeRef,
    attributes,
    listeners,
    transform
  } = useDraggable({
    id: folder.id,
    data: {
      type: 'FolderType',
      parentId: folder.parentId,
    }
  });

  const combinedRef = (node: HTMLElement | null) => {
    setDroppableNodeRef(node);
    setDraggableNodeRef(node);
  };

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined;

  return <div ref={combinedRef}
              {...attributes}
              {...listeners}
              className="pl-5 pt-1"
              style={style}
  >
    <div className={"px-1 flex gap-1 items-center"}>
      <ArchiveIcon width={16} height={16} />
      {folder.folderName}
    </div>
    {folder.children.map(child => {
      if (child.type === NoteFileSystemType.FOLDER) {
        return <Folder key={child.id} folder={child} />;
      } else {
        return <Note key={child.id} note={child} />;
      }
    })}
  </div>;
};

export default Folder;