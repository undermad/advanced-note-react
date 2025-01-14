import { FolderNode, NoteFileSystemType, NoteNode, NotesDto, TreeNode } from "./NoteFileSystemTypes.ts";

export const sortFoldersOnTop = (folder: FolderNode): FolderNode => {
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
      sortFoldersOnTop(child as FolderNode);
    }
  });

  return folder;
};

export const mapDtoToRoot = (data: NotesDto): FolderNode => {
  const foldersMap = new Map<string, FolderNode>;
  const filesMap = new Map<string, NoteNode>;

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

  console.log(root);
  return root;
};

export const assignDepth = (node: TreeNode, depth: number) => {
  node.depth = depth;
  if (node.type === NoteFileSystemType.FOLDER) {
    const folderNode = node as FolderNode;
    folderNode.children.forEach(child => {
      assignDepth(child, depth + 1);
    });
  }
};


export const findFolderDfs = (node: FolderNode, id: string): FolderNode | undefined => {
  if (node.id === id) return node;
  for (const child of node.children) {
    if (child.type === NoteFileSystemType.FOLDER) {
      const result = findFolderDfs(child as FolderNode, id);
      if (result) return result;
    }
  }
  return undefined;
};

export const findNoteDfs = (node: TreeNode, id: string): NoteNode | undefined => {
  if (node.type === NoteFileSystemType.NOTE && node.id === id) return node as NoteNode;
  if (node.type === NoteFileSystemType.FOLDER) {
    const folderNode = node as FolderNode;
    for (const child of folderNode.children) {
      if (child.type === NoteFileSystemType.NOTE && child.id === id) return child as NoteNode;
      if (child.type === NoteFileSystemType.FOLDER) {
        const result = findNoteDfs(child as FolderNode, id);
        if (result) return result;
      }
    }
  }
  return undefined;
};

export const findNoteOrFolder = (node: FolderNode, id: string, type: NoteFileSystemType) => {
  if (type === NoteFileSystemType.FOLDER) {
    return findFolderDfs(node, id);
  } else if (type === NoteFileSystemType.NOTE) {
    return findNoteDfs(node, id);
  }
};


export const findAllChildrenIds = (node: TreeNode, children: Set<string>) => {
  if (node.type == NoteFileSystemType.FOLDER) {
    const folderNode = node as FolderNode;
    folderNode.children.forEach((child) => {
      children.add(child.id);
      findAllChildrenIds(child, children);
    });
  }
  return children;
};

export const flatTreeInAlphabeticalOrder = (node: TreeNode, items: TreeNode[]) => {
  items.push(node);
  if (node.type == NoteFileSystemType.FOLDER) {
    const folderNode = node as FolderNode;

    const folders = folderNode.children.filter(item => item.type === NoteFileSystemType.FOLDER)
      .map(folder => folder as FolderNode)
      .sort((a, b) => a.folderName < b.folderName ? -1 : 1);

    const notes = folderNode.children.filter(item => item.type === NoteFileSystemType.NOTE)
      .map(note => note as NoteNode)
      .sort((a, b) => a.fileName < b.fileName ? -1 : 1);

    folders.forEach((item) => {
      flatTreeInAlphabeticalOrder(item, items);
    });
    
    notes.forEach((item) => {
      flatTreeInAlphabeticalOrder(item, items);
    });
  }
  return items;
};


