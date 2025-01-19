import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type KeyboardSliceState = {
  keys: { [key: string]: boolean };
};

const initialState: KeyboardSliceState = {
  keys: {
    ControlLeft: false,
    ShiftLeft: false
  }
};

const keyboardSlice = createSlice({
  name: "keyboard",
  initialState: initialState,
  reducers: {
    onKeyPressed: (state, action: PayloadAction<{ code: string }>) => {
      const { code } = action.payload;
      state.keys[code] = true;
    },
    onKeyReleased: (state, action: PayloadAction<{ code: string }>) => {
      const { code } = action.payload;
      state.keys[code] = false; 
    },
  }
});

export const { onKeyPressed, onKeyReleased } = keyboardSlice.actions;
export default keyboardSlice.reducer;