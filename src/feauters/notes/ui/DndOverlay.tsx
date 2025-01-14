import { useEffect, useState } from "react";
import { DragOverlay } from "@dnd-kit/core";
import { NoteFileSystemType, TreeNode } from "../NoteFileSystemTypes.ts";
import { ArchiveIcon, FileIcon } from "@radix-ui/react-icons";

type Props = {
  activeNode: TreeNode | null;
}

const DndOverlay = ({ activeNode }: Props) => {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!activeNode) {
    return null;
  }

  return <DragOverlay style={{
    position: "fixed",
    left: mousePosition.x,
    top: mousePosition.y,
    transform: "translate(-50%, -50%)",
    width: "16px",
    height: "16px",
    pointerEvents: "none",
  }}>
    {activeNode.type === NoteFileSystemType.FOLDER && <ArchiveIcon width={16} height={16} />}
    {activeNode.type === NoteFileSystemType.NOTE && <FileIcon width={16} height={16} />}
  </DragOverlay>;
};

export default DndOverlay;