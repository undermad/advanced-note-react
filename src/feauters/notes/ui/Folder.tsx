import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import { CiFolderOn } from "react-icons/ci";

type Props = {
  folder: FileTreeNode
}

const Folder = ({ folder }: Props) => {

  if (!folder || folder.depth === undefined) {
    return null;
  }
  
  const style = {
    marginLeft: folder.depth * 20,
    // opacity: folder.isDragging ? 0.5 : 1,
    transition: '0.1s ease-in',
  }

  return <div className={`pl-2 flex gap-1 items-center text-sm`} style={style}>
    <CiFolderOn width={12} height={12} />
    {folder.name}
  </div>;
};

export default Folder;