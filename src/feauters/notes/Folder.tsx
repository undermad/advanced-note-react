import { FolderType, NoteFileSystemType } from "./NoteFileSystemTypes.ts";
import Note from "./Note.tsx";
import { ArchiveIcon } from "@radix-ui/react-icons";

type FolderProps = {
  folder: FolderType
}

const Folder = ({ folder }: FolderProps) => {
  return <div className="pl-5 pt-1">
    <div className={"px-1 flex gap-1 items-center"}>
      <ArchiveIcon width={16} height={16} />
      {folder.name}
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