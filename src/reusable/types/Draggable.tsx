import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import React from "react";

type Props = {
  children: React.ReactNode,
  args: UseDraggableArguments,
  disabled: boolean,
}

const Draggable = ({ children, args, disabled }: Props) => {

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable(args);


  return <div
    style={{
      opacity: isDragging ? 0.5 : 1,
    }}
    ref={setNodeRef}
    {...(disabled ? {} : attributes)}
    {...(disabled ? {} : listeners)}
  >
    {children}
  </div>;
};

export default Draggable;