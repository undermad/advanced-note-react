import { FolderType, NoteFileSystemType, NotesDto, NoteType } from "./NoteFileSystemTypes.ts";

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

export const mapDtoToRoot = (data: NotesDto): FolderType => {
  const foldersMap = new Map<string, FolderType>;
  const filesMap = new Map<string, NoteType>;

  data.folders.forEach(folder => foldersMap.set(folder.id, { ...folder, children: [] }));
  data.files.forEach(file => filesMap.set(file.id, file));

  data.folders.forEach(folder => {
    const currentFolder = foldersMap.get(folder.id);
    if (!currentFolder) {
      throw new Error(`Can not find folder with id ${folder.id}`);
    }
    folder.children.forEach(childId => {
      const childFolder = foldersMap.get(childId);
      const childFile = filesMap.get(childId);
      if (childFolder) {
        currentFolder.children.push(childFolder);
      } else if (childFile) {
        currentFolder.children.push(childFile);
      }
    });
  });

  const rootId = data.folders.find(folder => folder.parentId === null)?.id;
  if (!rootId) throw new Error("Can not find root");

  const root = foldersMap.get(rootId);
  if (!root) throw new Error("Root doesn't exist");
  
  return root;
};