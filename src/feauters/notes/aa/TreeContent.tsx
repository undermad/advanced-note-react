import { FolderNode, NoteFileSystemType, NoteNode, TreeNode } from "../NoteFileSystemTypes.ts";
import Folder from "../ui/Folder.tsx";
import Note from "../ui/Note.tsx";
import Droppable from "../../../reusable/types/Droppable.tsx";
import Draggable from "../../../reusable/types/Draggable.tsx";

type Props = {
  items: TreeNode[],
}

const TreeContent = ({ items }: Props) => {
  
  return <>
    {items.length > 0 && renderChildren(items)}
  </>;
};

const renderChildren = (nodes: TreeNode[]) => {
  return nodes.map((node: TreeNode) => {
    if (node.type === NoteFileSystemType.FOLDER) {
      return <Droppable key={node.id} args={{ id: node.id, data: { accepts: ["FolderType", "NoteType"] } }}>
        <Draggable
          args={{
            id: node.id, data: {
              parentId: node.parentId,
              type: "FolderType"
            }
          }}
          key={node.id}>
          <Folder folder={node as FolderNode} />
        </Draggable>
      </Droppable>;

    }
    if (node.type === NoteFileSystemType.NOTE) {
      return <Draggable
        key={node.id}
        args={{
          id: node.id,
          data: {
            parentId: node.parentId,
            type: "NoteType"
          }
        }}>
        <Note note={node as NoteNode} />
      </Draggable>;
    }

  });


};


export default TreeContent;