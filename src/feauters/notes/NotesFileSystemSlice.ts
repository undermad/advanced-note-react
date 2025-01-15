import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileNode, FileTreeNode } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";
import { Status } from "../../reusable/types/Statuses.ts";
import { mapFilesToTreeNodes, sortFolderThenFileAlphabetically } from "./Utils.ts";

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (rootId: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/files/${rootId}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});


export type MoveNodesAsyncPayload = {
  active: FileTreeNode,
  over: FileTreeNode,
}

export const moveNodesAsync = createAsyncThunk("notes/moveNodes", async (payload: MoveNodesAsyncPayload, thunkAPI) => {
  try {

    const state = thunkAPI.getState() as RootState;

    const { active, over } = payload;

    if (!active.parentId) return;

    const parentNode = state.files.files.find(file => file.id === active.parentId)!;
    const activeNode = state.files.files.find(file => file.id === active.id);
    const overNode = state.files.files.find(file => file.id === over.id);
    if (!parentNode || !activeNode || !overNode || overNode.depth === undefined) return;

    if (!overNode.children) return;

    const response = await axios.patch(`http://localhost:8080/api/v1/files`, {
      over: {
        ...overNode,
        children: [...overNode.children, activeNode.id]
      } as FileNode,
      parent: {
        ...parentNode,
        children: parentNode.children?.filter(child => child !== activeNode.id)
      } as FileNode
    });

    return {
      data: response.data,
      active: active,
      over: over
    };
  } catch (error) {
    return Promise.reject(error);
  }
});

export type PatchNotesResult = {
  data: string,
  active: FileTreeNode,
  over: FileTreeNode,
}


export interface FilesState {
  files: FileTreeNode[],
  status: Status,
  error: string | null,
}

const initialState: FilesState = {
  files: [],
  status: Status.IDLE,
  error: null
};

const filesSlice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    // updateDragging: (state, action: PayloadAction<{ nodeId: string, isDragging: boolean, }>) => {
    //   const node = state.notes.find(note => note.id === action.payload.nodeId)!;
    //   node.isDragging = action.payload.isDragging;
    // }
  },
  extraReducers(builder) {
    builder


      .addCase(fetchNotes.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<FileNode[]>) => {
        state.status = Status.SUCCEEDED;
        state.files = sortFolderThenFileAlphabetically(mapFilesToTreeNodes(action.payload));
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || "Failed to fetch notes";
      })


      .addCase(moveNodesAsync.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(moveNodesAsync.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || "Failed to move data";
      })
      .addCase(moveNodesAsync.fulfilled, (state, action: PayloadAction<PatchNotesResult>) => {
        state.status = Status.SUCCEEDED;

        const { active, over } = action.payload;
        console.log(action, over);

        if (!active.parentId) return;

        const parentNode = state.files.find(file => file.id === active.parentId)!;
        const activeNode = state.files.find(file => file.id === active.id);
        const overNode = state.files.find(file => file.id === over.id);
        if (!parentNode || !activeNode || !overNode || overNode.depth === undefined) return;


        // update parent children
        parentNode.children = parentNode.children?.filter(childId => childId !== active.id);

        const updatedParentNode = {
          ...parentNode,
          children: parentNode.children?.filter(childId => childId !== active.id)
        };

        const newState = state.files.map(file => {
          if (file.id === parentNode.id) {
            return {
              ...parentNode,
              children: parentNode.children?.filter(childId => childId !== active.id)
            };
          }
          if (!overNode.children) throw new Error("Over node children is undefined.");
          if (file.id === overNode.id) {
            return {
              ...overNode,
              children: [...overNode.children, activeNode.id]
            };
          }

          return file;
        });
        
        
        state.files = sortFolderThenFileAlphabetically(newState);


      });
  }
});


export const selectAllFiles = (state: RootState) => state.files.files;
export const selectNotesStatus = (state: RootState) => state.files.status;
export const selectNotesError = (state: RootState) => state.files.error;

export const { updateDragging } = filesSlice.actions;

export default filesSlice.reducer;