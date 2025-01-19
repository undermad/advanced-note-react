import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import Folder from "../ui/Folder.tsx";
import Note from "../ui/Note.tsx";
import Droppable from "../../../reusable/types/Droppable.tsx";
import Draggable from "../../../reusable/types/Draggable.tsx";
import Selectable from "./Selectable.tsx";

type Props = {
  items: FileTreeNode[],
  isMutating: boolean,
}

const TreeContent = ({ items, isMutating }: Props) => {

  return <>
    {items.length > 0 && renderChildren(items, isMutating)}
  </>;
};

const renderChildren = (nodes: FileTreeNode[], isMutating: boolean) => {

  const allSelectable = nodes
    .filter(node => node.visible)
    .map(node => node.id);


  return nodes.map((node: FileTreeNode) => {
    if (!node.visible) return;

    if (node.isFolder) {
      return <Selectable itemId={node.id}
                         allSelectable={allSelectable}
                         key={node.id}>
        <Droppable args={{ id: node.id, data: { accepts: ["FolderType", "NoteType"] } }}>
          <Draggable
            disabled={isMutating}
            args={{
              id: node.id, data: {
                parentId: node.parentId,
                type: "FolderType"
              }
            }}
            key={node.id}>
            <Folder folder={node} />
          </Draggable>
        </Droppable>
      </Selectable>;
    }

    if (!node.isFolder) {
      return <Selectable itemId={node.id}
                         allSelectable={allSelectable}
                         key={node.id}>
        <Draggable
          disabled={isMutating}
          key={node.id}
          args={{
            id: node.id,
            data: {
              parentId: node.parentId,
              type: "NoteType"
            }
          }}>
          <Note note={node} />
        </Draggable>
      </Selectable>;
    }

  });


};


export default TreeContent;