import { useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type Props = {
  children: React.ReactNode,
  element?: React.ElementType,
  args: UseDraggableArguments
}

const Draggable = ({ children, element: Element = "div", args }: Props) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable(args);
  
  console.log(isDragging)

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? '0' : '1',
  };


  return <Element ref={setNodeRef} {...attributes} {...listeners} style={style}>{children}</Element>;
};

export default Draggable;