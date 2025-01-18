import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import Folder from "../ui/Folder.tsx";
import Note from "../ui/Note.tsx";
import Droppable from "../../../reusable/types/Droppable.tsx";
import Draggable from "../../../reusable/types/Draggable.tsx";

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

  return nodes.map((node: FileTreeNode) => {
    if (node.visible === false) return;

    if (node.isFolder) {
      return <Droppable key={node.id} args={{ id: node.id, data: { accepts: ["FolderType", "NoteType"] } }}>
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
      </Droppable>;
    }

    if (!node.isFolder) {
      return <Draggable
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
      </Draggable>;
    }

  });


};


export default TreeContent;