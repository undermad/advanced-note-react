import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import React from "react";

type Props = {
  children: React.ReactNode,
  element?: React.ElementType,
  args: UseDraggableArguments
}

const Draggable = ({ children, element: Element = "div", args }: Props) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(args);
  

  return <Element ref={setNodeRef} {...attributes} {...listeners} >{children}</Element>;
};

export default Draggable;