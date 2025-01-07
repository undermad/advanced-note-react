import Folder from "./ui/Folder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectAllNotes } from "./NotesFileSystemSlice.ts";
import { AppDispatch } from "../../state/State.ts";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const NotesComponent = () => {

  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);


  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over === null) return;
    
    const itemId = active.id;
    const containerId = over.id;
    if(itemId === containerId) return;
    
    

  };


  return <div>
    <DndContext onDragEnd={handleOnDragEnd}>
      <Folder folder={notes.notes} />
    </DndContext>
  </div>;
};

export default NotesComponent;