import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../state/State.ts";

export type FilesSliceState = {
  selectedFiles: string[],
}

const initialState: FilesSliceState = {
  selectedFiles: []
};


const filesSlice = createSlice({
  name: "files",
  initialState: initialState,
  reducers: {
    selectFile: (state, action: PayloadAction<{ fileId: string }>) => {
      state.selectedFiles = [action.payload.fileId];
    },
    selectMultipleFiles: (state, action: PayloadAction<{ filesIds: string[] }>) => {
      state.selectedFiles = [...action.payload.filesIds];
    },

    selectSingleMultiFile: (state, action: PayloadAction<{ filesIds: string[] }>) => {
      state.selectedFiles = [...state.selectedFiles, ...action.payload.filesIds];
    },
    addFileToSelection: (state, action: PayloadAction<{ fileId: string }>) => {
      const { fileId } = action.payload;
      if (state.selectedFiles.includes(fileId)) {
        state.selectedFiles = state.selectedFiles.filter(slectedFile => slectedFile !== fileId);
      } else {
        state.selectedFiles = [...state.selectedFiles, action.payload.fileId];
      }
    }
  }
});

export const selectAllSelectedFiles = (state: RootState) => state.files.selectedFiles;

export const isFileSelected = (state: RootState, fileId: string): boolean => {
  const selectedFile = state.files.selectedFiles.find(selectedFile => selectedFile === fileId);
  return !!selectedFile;
};


export const { addFileToSelection, selectFile, selectMultipleFiles, selectSingleMultiFile } = filesSlice.actions;
export default filesSlice.reducer;