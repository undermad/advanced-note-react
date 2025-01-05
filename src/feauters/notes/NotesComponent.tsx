import Folder from "./ui/Folder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes } from "./NotesFileSystemSlice.ts";
import { AppDispatch } from "../../state/State.ts";

const NotesComponent = () => {

  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);


  return <div>
    <Folder folder={notes.notes} />
  </div>;
};

export default NotesComponent;