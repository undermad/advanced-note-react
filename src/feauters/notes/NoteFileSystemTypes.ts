export type FileNode = {
  id: string,
  rootId: string,
  isFolder: boolean,
  name: string,
  children: string[] | undefined,
  fileId: string | undefined,
  extension: Extension
}

export enum Extension {
  FOLDER = "FOLDER",
  TXT = "TXT",
  ROOT = "ROOT",
}

export type FileTreeNode = {
  depth: number | undefined,
  parentId: string | undefined,
  collapsed: boolean | undefined,
  visible: boolean,
} & FileNode;

export const downCastToFileNode = (node: FileTreeNode) => {
  return {
    id: node.id,
    rootId: node.rootId,
    isFolder: node.isFolder,
    name: node.name,
    children: node.children,
    fileId: node.fileId,
    extension: node.extension
  };
};

