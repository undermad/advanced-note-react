import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";

interface Props {
  children?: React.ReactNode,
  args: UseDroppableArguments,
}


const Droppable = ({ children, args }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ ...args });

  const style = {
    border: isOver ? "2px solid green" : "2px solid transparent",
    borderRadius: "8px", // Makes the border nice and rounded
    transition: "border 0.3s ease" // Smooth transition when `isOver` changes
  } ;

  return <div style={style} ref={setNodeRef}>
    {children}
  </div>;
};

export default Droppable;