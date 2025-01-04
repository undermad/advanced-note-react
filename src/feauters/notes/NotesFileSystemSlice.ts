import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeFiles, FolderType, NoteType } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";
import { assignParent, sortFoldersOnTop } from "./NotesFileSystemUtils.ts";


export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (rootId: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/v1/notes/${rootId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCEEDED = "SUCCEEDED",
  FAILED = "FAILED",
}

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

type NotesDto = {
  folders: FolderType[],
  files: NoteType[],
}

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<NotesDto>) => {
        state.status = Status.SUCCEEDED;
        
        const dto = action.payload;
        
        const root = dto.folders.filter(folder => folder.parentId === null);
        
        
        
        
        console.log(root)
        
        
        
        console.log(action.payload)
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

export default notesSlice.reducer;