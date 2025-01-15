
export enum NoteFileSystemType {
  NOTE = 'NOTE',
  FOLDER = 'FOLDER'
}

export type TreeNode = {
  id: string,
  type: NoteFileSystemType.NOTE | NoteFileSystemType.FOLDER,
  parentId: string | null,
  rootId: string | undefined,
  depth: number | undefined,
  isDragging: boolean,
}

export type FolderNode = TreeNode & {
  folderName: string,
  children: Array<TreeNode>
}

export type NoteNode = TreeNode & {
  fileName: string,
  description: string,
  body: string,
}

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
  FOLDER = 'FOLDER',
  TXT = 'TXT',
  ROOT = 'ROOT',
}

export type FileTreeNode = {
  depth: number | undefined,
  parentId: string | undefined,
} & FileNode;



export type NotesDto = {
  folders: FolderDto[],
  files: NoteNode[],
}

export type FolderDto = {
  children: string[]
} & FolderNode


