import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeFiles, FolderType, NotesDto, NoteType } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";
import { findFolderDfs, findNoteOrFolder, mapDtoToRoot } from "./NotesFileSystemUtils.ts";
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
  notes: FolderType,
  status: Status,
  error: string | null,
}

const initialState: NotesState = {
  notes: fakeFiles,
  status: Status.IDLE,
  error: null
};

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    moveFolder: (state, action: PayloadAction<{
      itemId: string,
      containerId: string,
      parentId: string,
    }>) => {
      const { itemId, containerId, parentId } = action.payload;

      const newContainer = findFolderDfs(containerId, new Array<FolderType | NoteType>(state.notes));
      const activeContainer = findNoteOrFolder(itemId, new Array<FolderType | NoteType>(state.notes));
      const parentContainer = findFolderDfs(parentId, new Array<FolderType | NoteType>(state.notes));
      

      newContainer?.children.push(activeContainer);
      parentContainer?.children.splice(parentContainer?.children.indexOf(activeContainer), 1);
      activeContainer.parentId = containerId;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<NotesDto>) => {
        state.status = Status.SUCCEEDED;
        state.notes = mapDtoToRoot(action.payload);
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

export const { moveFolder } = notesSlice.actions;

export default notesSlice.reducer;