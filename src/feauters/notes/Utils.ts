import { Extension, FileNode, FileTreeNode } from "./NoteFileSystemTypes.ts";

export const mapFilesToTreeNodes = (payload: FileNode[]) => {
  const files = payload.map(file => {
    return {
      ...file,
      depth: undefined,
      parentId: undefined
    } as FileTreeNode;
  });

  const idMap = new Map<string, FileTreeNode>(files.map(file => [file.id, file]));
  const root = files.find(file => file.extension === Extension.ROOT)!;
  assignDepthAndParent(root.id, 0, idMap);
  return Array.from(idMap.values());
};

export const assignDepthAndParent = (fileId: string, depth: number, idToFile: Map<string, FileTreeNode>) => {
  const current = idToFile.get(fileId)!;
  current.depth = depth;
  if (current.isFolder) {
    current.children?.forEach(childId => {
      const child = idToFile.get(childId)!;
      child.parentId = current.id;
      assignDepthAndParent(childId, depth + 1, idToFile);
    });
  }
};

export const sortFolderThenFileAlphabetically = (files: FileTreeNode[]) => {
  const idMap = new Map<string, FileTreeNode>(files.map(file => [file.id, file]));
  const root = files.find(file => file.extension === Extension.ROOT)!;
  return sortFiles(root, [], idMap);
};

const sortFiles = (file: FileTreeNode, result: FileTreeNode[], idMap: Map<string, FileTreeNode>) => {
  result.push(file);
  if (file.isFolder && file.children) {
    const folders = file.children.map(childId => idMap.get(childId)!)
      .filter(child => child.isFolder)
      .sort((a, b) => a.name < b.name ? -1 : 1);

    folders.forEach(folder => sortFiles(folder, result, idMap));

    const files = file.children.map(childId => idMap.get(childId)!)
      .filter(child => !child.isFolder)
      .sort((a, b) => a.name < b.name ? -1 : 1);

    files.forEach((file) => sortFiles(file, result, idMap));
  }
  return result;
};

export const findAllChildrenIds = (node: FileTreeNode, children: Set<string>, files: Map<string, FileTreeNode>) => {
  if (node.isFolder && node.children) {
    node.children.forEach(childId => {
      children.add(childId);
      findAllChildrenIds(files.get(childId)!, children, files);
    });
  }
  return children;
};

