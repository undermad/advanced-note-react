import { useState } from "react";
import { COLUMNS, INITIAL_VALUES, TaskType } from "./FakeFiles.ts";
import Column from "./Column.tsx";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const DragAndDrop = () => {
  const [tasks, setTasks] = useState<TaskType[]>(INITIAL_VALUES);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over === null) return;

    const taskId = active.id;
    const newStatus = over.id as TaskType["status"];

    setTasks(() => {
      return tasks.map(task => {
        return task.id === taskId ?
          {
            ...task,
            status: newStatus
          } : task;
      });
    });

  };

  return <div className={"flex gap-5"}>
    <DndContext onDragEnd={handleDragEnd}>
      {COLUMNS.map(column => {
        return <Column
          key={column.id}
          column={column}
          tasks={tasks.filter(task => task.status === column.id)}
        />;
      })}
    </DndContext>
  </div>;
};

export default DragAndDrop;