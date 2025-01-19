import { createSlice } from '@reduxjs/toolkit';

const mousePositionSlice = createSlice({
  name: 'mousePosition',
  initialState: {
    x: 0,
    y: 0,
  },
  reducers: {
    updateMousePosition: (state, action) => {
      state.x = action.payload.x;
      state.y = action.payload.y;
    },
  },
});

export const { updateMousePosition } = mousePositionSlice.actions;
export default mousePositionSlice.reducer;