import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/State.ts";
import { fetchNotes } from "./feauters/notes/NotesFileSystemSlice.ts";

store.dispatch(fetchNotes("cf063165-693d-47a9-823e-f3779306de6c"));


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);