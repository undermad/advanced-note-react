import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import TreeContent from "./TreeContent.tsx";
import { downCastToFileNode, FileTreeNode } from "../NoteFileSystemTypes.ts";
import { useState } from "react";
import DndOverlay from "../ui/DndOverlay.tsx";
import { findAllChildrenIds } from "../Utils.ts";
import { useUpdateFilesMutation } from "../FilesApiSlice.ts";

type Props = {
  files: FileTreeNode[];
}

const TreeComponent = ({ files }: Props) => {

  const [updateFileMutation, { isLoading: isMutating }] = useUpdateFilesMutation();
  const [activeNode, setActiveNode] = useState<FileTreeNode | null>(null);

  const moveFile = (active: FileTreeNode, over: FileTreeNode, parent: FileTreeNode) => {
    if (!over.children) return;
    const updatedOver = { ...downCastToFileNode(over), children: [...over.children, active.id] };
    const updatedParent = {
      ...downCastToFileNode(parent),
      children: parent.children?.filter(childId => childId !== active.id)
    };
    updateFileMutation({ updatedOverNode: updatedOver, updatedParentNode: updatedParent });
  };

  const handleOnDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const node = files.find(item => item.id === active.id)!;
    setActiveNode(node);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setTimeout(destroyActiveNode, 300);
    const activeNode = files.find(item => item.id === active.id)!;
    const overNode = files.find(item => item.id === over?.id);
    const parent = files.find(item => item.id === activeNode.parentId);
    if (!overNode || activeNode?.id === overNode.id || !parent) return;
    const activeNodeChildren = findAllChildrenIds(activeNode, new Set<string>(), new Map(files.map(file => [file.id, file])));
    if (activeNodeChildren.has(overNode.id) || overNode.children?.indexOf(activeNode.id) !== -1) {
      return;
    }
    moveFile(activeNode, overNode, parent);
  };
  
  const destroyActiveNode = (): void => {
    setActiveNode(null);
  }
  
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5
    }
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
      delay: 250,
      tolerance: 5
    }
  });

  const sensors = useSensors(
    mouseSensor,
    touchSensor
  );

  return <DndContext
    sensors={sensors}
    onDragEnd={(event) => {
      if (isMutating) return;
      handleOnDragEnd(event);
    }}
    onDragStart={(event) => {
      if (activeNode) return;
      handleOnDragStart(event);
    }}
  >
    <TreeContent items={files} isMutating={isMutating} />
    <DndOverlay activeNode={activeNode} />
  </DndContext>;
};

export default TreeComponent;