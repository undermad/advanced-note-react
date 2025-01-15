import { useDispatch, useSelector } from "react-redux";
import { moveNodesAsync, selectAllFiles } from "../NotesFileSystemSlice.ts";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import TreeContent from "./TreeContent.tsx";
import { FileTreeNode } from "../NoteFileSystemTypes.ts";
import { useState } from "react";
import {  } from "../NotesFileSystemUtils.ts";
import { AppDispatch } from "../../../state/State.ts";
import DndOverlay from "../ui/DndOverlay.tsx";
import { findAllChildrenIds } from "../Utils.ts";

const TreeComponent = () => {

  const files = useSelector(selectAllFiles);
  const dispatch = useDispatch<AppDispatch>();
  const [activeNode, setActiveNode] = useState<FileTreeNode | null>(null);

  const handleOnDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const node = files.find(item => item.id === active.id)!;

    // dispatch(updateDragging({ nodeId: node.id, isDragging: true }));
    setActiveNode(node);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // dispatch(updateDragging({ nodeId: String(active.id), isDragging: false }));

    const activeNode = files.find(item => item.id === active.id)!;
    const overNode = files.find(item => item.id === over?.id);
    if (!overNode || activeNode?.id === overNode.id) return;
    

    const activeNodeChildren = findAllChildrenIds(activeNode, new Set<string>(), new Map(files.map(file => [file.id, file])));

    if (activeNodeChildren.has(overNode.id)) {
      return;
    }
    
    dispatch(moveNodesAsync({active: activeNode, over: overNode}))
  };

  return <DndContext
    onDragEnd={handleOnDragEnd}
    onDragStart={handleOnDragStart}
  >
    <TreeContent items={files} />
    <DndOverlay activeNode={activeNode} />
  </DndContext>;
};

export default TreeComponent;