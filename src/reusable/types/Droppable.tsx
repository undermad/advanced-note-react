import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";

interface Props {
  children?: React.ReactNode,
  args: UseDroppableArguments,
}


const Droppable = ({ children, args }: Props) => {
  const { setNodeRef, isOver } = useDroppable({ ...args });

  const style = {
    border: isOver ? "1px dashed green" : "1px solid transparent",
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.1)" : "transparent",
    boxShadow: isOver ? "0 1px 4px rgba(0, 255, 0, 0.3)" : "none",
    transition: "all 0.3s ease"
  };

  return <div style={style} ref={setNodeRef}>
    {children}
  </div>;
};

export default Droppable;