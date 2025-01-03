import { FolderType, NoteFileSystemType } from "./NoteFileSystemTypes.ts";
import { useCallback } from "react";

export const useNoteFileSystemUtilities = () => {

  const sortFoldersOnTop = useCallback((folder: FolderType): FolderType => {
    folder.children.sort((a, b) => {
      if (a.type === NoteFileSystemType.FOLDER && b.type !== NoteFileSystemType.FOLDER) {
        return -1;
      }
      if (a.type !== NoteFileSystemType.FOLDER && b.type === NoteFileSystemType.FOLDER) {
        return 1;
      }
      return 0;
    });

    folder.children.forEach(child => {
      if (child.type === NoteFileSystemType.FOLDER) {
        sortFoldersOnTop(child as FolderType);
      }
    });

    return folder;
  }, []);

  return {
    moveFolderToTop: sortFoldersOnTop
  };
};