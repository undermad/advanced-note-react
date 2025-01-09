import { useDroppable, UseDroppableArguments } from "@dnd-kit/core";

interface Props {
  children?: React.ReactNode,
  args: UseDroppableArguments,
}


const Droppable = ({ children,  args }: Props) => {
  const { setNodeRef } = useDroppable({ ...args });

  return <div ref={setNodeRef}>
    {children}
  </div>;
};

export default Droppable;