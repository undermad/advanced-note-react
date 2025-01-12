import React from "react";
import { UseDraggableArguments } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type Props = {
  children: React.ReactNode,
  element?: React.ElementType,
  args: UseDraggableArguments,
}

const Sortable = ({ children, element: Element = "div", args }: Props) => {


  const {
    attributes,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    isDragging,
    transition,
    active
  } = useSortable(args);


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? "0.5" : "1"
  };


  const setCombinedRef = (node: HTMLElement | null) => {
    setDraggableNodeRef(node);
    setDroppableNodeRef(node);
  };


  return <Element ref={setCombinedRef} {...attributes} {...listeners} style={style}>{children}</Element>;

};

export default Sortable;