import { ColumnType, TaskType } from "./FakeFiles.ts";
import TaskCard from "./TaskCard.tsx";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";

type ColumnProps = {
  column: ColumnType,
  tasks: TaskType[];
}

const Column = ({ column, tasks }: ColumnProps) => {
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>(tasks);
  
  
  const { setNodeRef } = useDroppable({ id: column.id });
  
  

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log(active);
    console.log(over);
    if (over && active.id !== over.id) {
      setCurrentTasks(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
  }
  
  
  return <div className={"flex w-80 flex-col rounded-lg bg-neutral-800 p-4"}>
    <h2 className={"mb-4 font-semibold text-neutral-100"}>
      {column.title}
    </h2>
    <div ref={setNodeRef} className={"flex flex-1 flex-col gap-4"}>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={currentTasks}>
          {currentTasks.map(task => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </SortableContext>
      </DndContext>
    </div>
  </div>;
};

export default Column;