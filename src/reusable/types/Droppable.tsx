import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";
import React from "react";
import { addFileToSelection } from "../../feauters/notes/FilesSlice.ts";

interface Props {
  children?: React.ReactNode,
  args: UseDroppableArguments,
}



const Droppable = ({ children, args }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ ...args });


  
  
  const style = {
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.1)" : "transparent",
    boxShadow: isOver ? "0 1px 4px rgba(0, 255, 0, 0.3)" : "none",
    transition: "all 0.1s ease"
  };



  return <div style={style} ref={setNodeRef}>
    {children}
  </div>;
};

export default Droppable;