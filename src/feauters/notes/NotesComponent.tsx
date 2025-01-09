import Folder from "./ui/Folder.tsx";
import { useDispatch, useSelector } from "react-redux";
import { moveFolder, selectAllNotes } from "./NotesFileSystemSlice.ts";
import { AppDispatch } from "../../state/State.ts";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";

const NotesComponent = () => {

  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector(selectAllNotes);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);

    if (over && over.data.current?.accepts.includes(active.data.current?.type)) {

      const itemId = String(active.id);
      const containerId = String(over.id);
      const parentId = String(active.data.current?.parentId);

      if (itemId === containerId || parentId === containerId) return;
      dispatch(moveFolder({ itemId: itemId, containerId: containerId, parentId: parentId }));
      setActiveId(null);
    }
  };


  return <div>
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleOnDragEnd}>
      <Folder folder={notes.notes} />
      <DragOverlay modifiers={[restrictToFirstScrollableAncestor]} >
        {activeId ? (
          <div
            style={{
              width: "50px", // Size of your overlay
              height: "20px",
              backgroundColor: "black",
              borderRadius: "4px",
              transform: "translate(-50%, -50%)",
            }}
          />
          ) : null}
      </DragOverlay>
    </DndContext>
  </div>;
};

export default NotesComponent;