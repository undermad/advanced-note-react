import { useEffect } from "react";
import Folder from "./Folder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes } from "./NoteSlice.ts";
import { AppDispatch } from "../../state/State.ts";

const NotesFiles = () => {

  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);

  useEffect(() => {
    console.log(notes);
  });

  return <div>
    <Folder folder={notes.notes} />
  </div>;
};

export default NotesFiles;