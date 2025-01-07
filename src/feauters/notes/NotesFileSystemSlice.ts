import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fakeFiles, FolderType, NoteFileSystemType, NotesDto, NoteType } from "./NoteFileSystemTypes.ts";
import axios from "axios";
import { RootState } from "../../state/State.ts";
import { mapDtoToRoot } from "./NotesFileSystemUtils.ts";
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
    moveFolder: (state, action: PayloadAction<{ itemId: string, containerId: string }>) => {

      const { itemId, containerId } = action.payload;

      const findNodeDfs = (nodeId: string, nodes: Array<FolderType | NoteType>): FolderType | undefined => {
        for (const item of nodes) {
          if (item.type !== NoteFileSystemType.FOLDER) {
            continue;
          }

          if (item.id === nodeId) {
            return item as FolderType;
          }

          const result = findNodeDfs(nodeId, (item as FolderType).children);
          if (result) {
            return result;
          }
        }
        return undefined;
      };

      const container = findNodeDfs(itemId, new Array<FolderType>(state.notes));
      
      
      
      
      
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

export default notesSlice.reducer;