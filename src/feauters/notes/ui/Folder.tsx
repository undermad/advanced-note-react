import { FolderType, NoteFileSystemType } from "../NoteFileSystemTypes.ts";
import Note from "./Note.tsx";
import { ArchiveIcon } from "@radix-ui/react-icons";
import Draggable from "../../../reusable/types/Draggable.tsx";
import Droppable from "../../../reusable/types/Droppable.tsx";

type FolderProps = {
  folder: FolderType
}

const Folder = ({ folder }: FolderProps) => {
  // const { setNodeRef } = useDroppable({
  //   id: folder.id,
  //   data: {
  //     accepts: ["FolderType", "NoteType"]
  //   }
  // });


  // const combinedRef = (node: HTMLElement | null) => {
  //   setDroppableNodeRef(node);
  //   setDraggableNodeRef(node);
  // };


  return (
    <Droppable args={{ id: folder.id, data: { accepts: ["FolderType", "NoteType"] } }}>
      <div className="pl-5 pt-1">
        <div className={"px-1 flex gap-1 items-center"}>
          <ArchiveIcon width={16} height={16} />
          {folder.folderName}
        </div>
        
        {renderChildren(folder)}

      </div>
    </Droppable>

  );

};

export default Folder;

const renderChildren = (folder: FolderType) => {
  return <>
    {folder.children.map(child => {
      if (child.type === NoteFileSystemType.FOLDER) {
        return (
          <Draggable
            args={{
              id: child.id, data: {
                parentId: child.parentId,
                type: "FolderType"
              }
            }}
            key={child.id}>
            <Folder folder={child} />
          </Draggable>

        );
      } else {
        return <Draggable
          args={{
            id: child.id,
            data: {
              parentId: child.parentId,
              type: 'NoteType',
            }
          }}
          key={child.id}>
        <Note key={child.id} note={child} />
        </Draggable>
      }
    })}
  </>;
};