import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/State.ts";
import { fetchNotes } from "./feauters/notes/NotesFileSystemSlice.ts";

store.dispatch(fetchNotes("2a753a8b-6452-4707-99d3-36e138c5da1f"));


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);