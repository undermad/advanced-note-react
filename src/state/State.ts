import { configureStore } from "@reduxjs/toolkit";
import { filesApiSlice } from "../feauters/notes/FilesApiSlice.ts";
import mousePositionReducer from "../reusable/mouse/mouseSlice.ts"
import filesReducer from "../feauters/notes/FilesSlice.ts";
import keyboardReducer from "../reusable/keyboard/keyboardSlice.ts"

export const store = configureStore({
  reducer: {
    mousePosition: mousePositionReducer,
    keyboard: keyboardReducer,
    files: filesReducer,
    [filesApiSlice.reducerPath]: filesApiSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filesApiSlice.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


