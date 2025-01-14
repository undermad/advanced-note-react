import { FolderNode } from "../NoteFileSystemTypes.ts";
import { ArchiveIcon } from "@radix-ui/react-icons";

type Props = {
  folder: FolderNode
}

const Folder = ({ folder }: Props) => {

  if (!folder || folder.depth === undefined) {
    return null;
  }
  
  const style = {
    marginLeft: folder.depth * 20
  }

  return <div className={`flex gap-1 items-center`} style={style}>
    <ArchiveIcon width={16} height={16} />
    {folder.folderName}
  </div>;
};

export default Folder;