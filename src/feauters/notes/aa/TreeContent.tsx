import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import Folder from "../ui/Folder.tsx";
import Note from "../ui/Note.tsx";
import Droppable from "../../../reusable/types/Droppable.tsx";
import Draggable from "../../../reusable/types/Draggable.tsx";

type Props = {
  items: FileTreeNode[],
}

const TreeContent = ({ items }: Props) => {

  return <>
    {items.length > 0 && renderChildren(items)}
  </>;
};

const renderChildren = (nodes: FileTreeNode[]) => {

  return nodes.map((node: FileTreeNode) => {
    if (node.isFolder) {
      return <Droppable key={node.id} args={{ id: node.id, data: { accepts: ["FolderType", "NoteType"] } }}>
        <Draggable
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