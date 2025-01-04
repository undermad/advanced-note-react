import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeFiles, FolderType, NoteFileSystemType } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";

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


export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    const response = await axios.get(`http://localhost/api/v1/notes`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotes.pending, (state) => {
        sortFoldersOnTop(state.notes);
        assignParent(state.notes, state.notes);
        state.status = Status.LOADING;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<FolderType>) => {
        state.status = Status.SUCCEEDED;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.error = action.error.message || 'Failed to fetch notes';
      })
  }
});

const sortFoldersOnTop = (folder: FolderType): FolderType => {
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

const assignParent = (folder: FolderType, parent: FolderType) => {
  folder.children.forEach(child => {
    if (child.type === NoteFileSystemType.FOLDER) {
      child.parent = parent;
      assignParent(child, parent);
    } else if (child.type === NoteFileSystemType.NOTE) {
      child.parent = parent;
    }
  });
};

export const selectAllNotes = (state: RootState) => state.notes;
export const selectNotesStatus = (state: RootState) => state.notes.status;
export const selectNotesError = (state: RootState) => state.notes.error;

export default notesSlice.reducer;