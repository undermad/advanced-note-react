import { useEffect, useState } from "react";
import { DragOverlay } from "@dnd-kit/core";
import { Extension, FileTreeNode } from "../NoteFileSystemTypes.ts";
import { CiFileOn, CiFolderOn } from "react-icons/ci";

type Props = {
  activeNode: FileTreeNode | null;
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
    pointerEvents: "none"
  }}>
    {activeNode.extension === Extension.FOLDER && <CiFolderOn width={12} height={12} />}
    {activeNode.extension == Extension.TXT && <CiFileOn width={12} height={12} />}
  </DragOverlay>;
};

export default DndOverlay;