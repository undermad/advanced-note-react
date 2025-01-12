import { useDispatch, useSelector } from "react-redux";
import { moveNode, selectAllNotes } from "../NotesFileSystemSlice.ts";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import TreeContent from "./TreeContent.tsx";
import { FolderNode, TreeNode } from "../NoteFileSystemTypes.ts";
import { useEffect, useState } from "react";
import { findAllChildrenIds, flattenTree } from "../NotesFileSystemUtils.ts";
import { AppDispatch } from "../../../state/State.ts";
import DndOverlay from "../ui/DndOverlay.tsx";

const TreeComponent = () => {

  const root = useSelector(selectAllNotes);
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<TreeNode[]>([]);
  const [activeNode, setActiveNode] = useState<TreeNode | null>(null);

  const handleOnDragStart = (event: DragStartEvent) => {
    const { active } = event;

    const node = items.find(item => item.id === active.id);
    if (!node) return;

    setActiveNode(node);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const activeNode = items.find(item => item.id === active.id);
    const overNode = items.find(item => item.id === over?.id);
    if (!overNode || !activeNode || activeNode?.id === overNode.id) return;

    const activeNodeChildren = findAllChildrenIds(activeNode, new Set<string>());

    console.log(activeNodeChildren);
    console.log(overNode.id);

    if (activeNodeChildren.has(overNode.id)) {
      return;
    }

    dispatch(moveNode({ active: activeNode, over: overNode as FolderNode }));
  };

  useEffect(() => {
    setItems(flattenTree(root.root, []));
  }, [root]);


  return <DndContext
    onDragEnd={handleOnDragEnd}
    onDragStart={handleOnDragStart}
  >
    <TreeContent items={items} />
    {activeNode && <DndOverlay activeNode={activeNode}/>}
  </DndContext>;
};

export default TreeComponent;