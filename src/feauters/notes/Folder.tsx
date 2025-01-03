import { FolderType, NoteFileSystemType } from "./NoteFileSystemTypes.ts";
import Note from "./Note.tsx";
import { ArchiveIcon } from "@radix-ui/react-icons";

type FolderProps = {
  folder: FolderType
}

const Folder = ({ folder }: FolderProps) => {
  return <div className="pl-8 pt-1">
    <div className={"px-1 border border-green-400 w-fit flex gap-1 items-center"}>
      <ArchiveIcon />
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