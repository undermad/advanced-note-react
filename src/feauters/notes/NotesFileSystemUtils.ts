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

export const findFolderDfs = (nodeId: string, nodes: Array<FolderType | NoteType>): FolderType | undefined => {
  for (const item of nodes) {
    if (item.type !== NoteFileSystemType.FOLDER) {
      continue;
    }

    if (item.id === nodeId) {
      return item as FolderType;
    }

    const result = findFolderDfs(nodeId, (item as FolderType).children);
    if (result) {
      return result;
    }
  }
  return undefined;
};

export const findNoteDfs = (nodeId: string, nodes: Array<FolderType | NoteType>): NoteType | undefined => {
  if (!Array.isArray(nodes)) {
    return undefined;
  }
  
  for (const item of nodes) {
    if (item.id === nodeId) {
      return item as NoteType;
    }

    if (item.type === NoteFileSystemType.NOTE) {
      continue;
    }

    const result = findNoteDfs(nodeId, (item as FolderType).children);
    if (result) {
      return result;
    }
  }
  return undefined;
};

export const findNoteOrFolder = (nodeId: string, nodes: Array<FolderType | NoteType>): NoteType | FolderType => {
  const folder = findFolderDfs(nodeId, nodes);
  if (folder) {
    return folder;
  } 
  const result = findNoteDfs(nodeId, nodes);
  if (result) {
    return result;
  }
  throw new Error(`Can not find object with id ${nodeId}`);
}
// export const assignParent = (folder: FolderType, parent: FolderType) => {
//   folder.children.forEach(child => {
//     if (child.type === NoteFileSystemType.FOLDER) {
//       child.parent = parent;
//       assignParent(child, parent);
//     } else if (child.type === NoteFileSystemType.NOTE) {
//       child.parent = parent;
//     }
//   });
// };