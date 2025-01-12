import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FolderNode, NoteFileSystemType, NotesDto, TreeNode } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";
import {
  assignDepth,
  findFolderDfs, findNoteOrFolder,
  mapDtoToRoot
} from "./NotesFileSystemUtils.ts";
import { Status } from "../../reusable/types/Statuses.ts";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (rootId: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/notes/${rootId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});


export interface NotesState {
  root: FolderNode,
  status: Status,
  error: string | null,
}

const initialState: NotesState = {
  root: {
    id: "",
    type: NoteFileSystemType.FOLDER,
    parentId: null,
    rootId: undefined,
    depth: undefined,
    folderName: "Root",
    children: []
  },
  status: Status.IDLE,
  error: null
};

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    moveNode: (state, action: PayloadAction<{
      active: TreeNode,
      over: FolderNode,
    }>) => {
      const { active, over } = action.payload;

      if (!active.parentId) return;

      const parentNode = findFolderDfs(state.root, active.parentId);
      const activeNode = findNoteOrFolder(state.root, active.id, active.type);
      const overNode = findFolderDfs(state.root, over.id);
      if (!parentNode || !activeNode || !overNode || !overNode.depth) return;

      parentNode.children = parentNode.children.filter(child => child.id !== active.id);

      const updatedActiveNode = {
        ...activeNode,
        parentId: overNode.id,
        depth: overNode.depth + 1
      };

      assignDepth(updatedActiveNode, updatedActiveNode.depth);
      overNode.children = [...overNode.children, updatedActiveNode];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<NotesDto>) => {
        state.status = Status.SUCCEEDED;
        const root = mapDtoToRoot(action.payload);
        assignDepth(root, 0);
        state.root = root;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || "Failed to fetch notes";
      });
  }
});


export const selectAllNotes = (state: RootState) => state.notes;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export const selectNotesError = (state: RootState) => state.notes.error;

export const { moveNode } = notesSlice.actions;

export default notesSlice.reducer;