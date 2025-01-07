import Folder from "./ui/Folder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { moveFolder, selectAllNotes } from "./NotesFileSystemSlice.ts";
import { AppDispatch } from "../../state/State.ts";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const NotesComponent = () => {

  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);


  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);

    if (over && over.data.current?.accepts.includes(active.data.current?.type)) {

      const itemId = String(active.id);
      const containerId = String(over.id);
      const parentId = String(active.data.current?.parentId);
      
      if (itemId === containerId || parentId === containerId) return;
      dispatch(moveFolder({ itemId: itemId, containerId: containerId, parentId: parentId }));
    }
  };


  return <div>
    <DndContext onDragEnd={handleOnDragEnd}>
      <Folder folder={notes.notes} />
    </DndContext>
  </div>;
};

export default NotesComponent;