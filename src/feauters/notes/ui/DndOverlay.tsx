import { DragOverlay, DropAnimation } from "@dnd-kit/core";
import { Extension, FileTreeNode } from "../NoteFileSystemTypes.ts";
import { CiFileOn, CiFolderOn } from "react-icons/ci";
import useMousePosition from "../../../reusable/mouse/useMousePosition.ts";

type Props = {
  activeNode: FileTreeNode | null;
}

const DndOverlay = ({ activeNode }: Props) => {

  const {x, y} = useMousePosition();

  const dropAnimation: DropAnimation = {
    duration: 300,
    easing: "ease-in-out",
    keyframes: () => {
      return [
        {
          transform: `translate(-50%, -50%) scale(1.0)`
        },
        {
          transform: `translate(-50%, -50%) scale(1.1)`
        },
        {
          transform: `translate(-50%, -50%) scale(0)`
        }
      ];
    }
  };
  
  if (activeNode === null) {
    return;
  }
  
  return <DragOverlay
    dropAnimation={dropAnimation}
    style={{
      position: "fixed",
      left: x,
      top: y,
      transform: "translate(-50%, -50%)",
      width: "12px",
      height: "12px",
      pointerEvents: "none"
    }}
  >
    {activeNode.extension === Extension.FOLDER && <CiFolderOn width={12} height={12} />}
    {activeNode.extension == Extension.TXT && <CiFileOn width={12} height={12} />}
  </DragOverlay>;
};

export default DndOverlay;