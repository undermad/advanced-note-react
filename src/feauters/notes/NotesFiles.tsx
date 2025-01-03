import { useEffect, useState } from "react";
import { fakeFiles, FolderType } from "./NoteFileSystemTypes.ts";
import Folder from "./Folder.tsx";
import { useNoteFileSystemUtilities } from "./useNoteFileSystem.ts";

const NotesFiles = () => {

  const [files, setFiles] = useState<FolderType>(fakeFiles);
  const { moveFolderToTop } = useNoteFileSystemUtilities();
  

  useEffect(() => {
    moveFolderToTop(files);
  });

  return <div>
    <Folder folder={files} />
  </div>;
};

export default NotesFiles;