import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./state/State.ts";
import { fetchNotes } from "./feauters/notes/NotesFileSystemSlice.ts";

store.dispatch(fetchNotes("71adab32-ce6a-4978-b314-7bac7cedefaa"));


createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);