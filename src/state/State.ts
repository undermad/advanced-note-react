import { configureStore } from "@reduxjs/toolkit";
import { filesApiSlice } from "../feauters/notes/FilesApiSlice.ts";
import mousePositionReducer from "../reusable/hooks/mouse/mouseSlice.ts"


export const store = configureStore({
  reducer: {
    mousePosition: mousePositionReducer,
    [filesApiSlice.reducerPath]: filesApiSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filesApiSlice.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


