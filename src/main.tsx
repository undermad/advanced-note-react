import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/State.ts";
import { fetchNotes } from "./feauters/notes/NotesFileSystemSlice.ts";

store.dispatch(fetchNotes("a63c442f-540d-4a5c-ade0-aeb850319209"));


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);