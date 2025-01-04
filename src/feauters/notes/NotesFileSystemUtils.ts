import { FolderType, NoteFileSystemType } from "./NoteFileSystemTypes.ts";

export const sortFoldersOnTop = (folder: FolderType): FolderType => {
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
};

export const assignParent = (folder: FolderType, parent: FolderType) => {
  folder.children.forEach(child => {
    if (child.type === NoteFileSystemType.FOLDER) {
      child.parent = parent;
      assignParent(child, parent);
    } else if (child.type === NoteFileSystemType.NOTE) {
      child.parent = parent;
    }
  });
};