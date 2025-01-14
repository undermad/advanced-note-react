import { useDispatch, useSelector } from "react-redux";
import { moveNode, moveNodesAsync, selectAllNotes, updateDragging } from "../NotesFileSystemSlice.ts";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import TreeContent from "./TreeContent.tsx";
import { FolderNode, TreeNode } from "../NoteFileSystemTypes.ts";
import { useState } from "react";
import { findAllChildrenIds } from "../NotesFileSystemUtils.ts";
import { AppDispatch } from "../../../state/State.ts";
import DndOverlay from "../ui/DndOverlay.tsx";

const TreeComponent = () => {

  const root = useSelector(selectAllNotes);
  const dispatch = useDispatch<AppDispatch>();
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);

  const handleOnDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const node = root.notes.find(item => item.id === active.id);
    if (!node) return;

    dispatch(updateDragging({ nodeId: node.id, isDragging: true }));
    setActiveNode(node);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    dispatch(updateDragging({ nodeId: String(active.id), isDragging: false }));

    const activeNode = root.notes.find(item => item.id === active.id)!;
    const overNode = root.notes.find(item => item.id === over?.id);
    if (!overNode || activeNode?.id === overNode.id) return;
    

    const activeNodeChildren = findAllChildrenIds(activeNode, new Set<string>());

    if (activeNodeChildren.has(overNode.id)) {
      return;
    }
    
    // dispatch(moveNodesAsync({active: activeNode, over: overNode}))
    dispatch(moveNode({ active: activeNode, over: overNode as FolderNode }));
  };

  return <DndContext
    onDragEnd={handleOnDragEnd}
    onDragStart={handleOnDragStart}
  >
    <TreeContent items={root.notes} />
    <DndOverlay activeNode={activeNode} />
  </DndContext>;
};

export default TreeComponent;