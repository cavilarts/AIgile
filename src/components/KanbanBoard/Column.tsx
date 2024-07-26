"use client";

import { useRef, useState } from "react";
import { useDrop } from "ahooks";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import classNames from "classnames";

import { TaskCard } from "./TaskCard";

import { ColumnApi, ColumnStatus, TaskApi, TaskId } from "@/types";

export type ColumnProps = {
  className?: string;
  column: ColumnApi;
  tasks: TaskApi[];
  index: number;
  onTaskEdit: (taskId: TaskId, updatedTask: Partial<TaskApi>) => void;
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string
  ) => void;
};

export const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onTaskEdit,
  onTaskMove,
}) => {
  const dropRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useDrop(dropRef, {
    onDrop: (e) => {
      const taskId = e?.dataTransfer?.getData("taskId");
      const sourceColumnId = e?.dataTransfer?.getData("sourceColumnId");

      if (sourceColumnId && taskId && sourceColumnId !== column._id) {
        onTaskMove(taskId, sourceColumnId, String(column._id));
      }
      setIsHovering(false);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  console.log("tasks", tasks);

  return (
    <Card
      ref={dropRef}
      className={classNames(
        "width-250 margin-0-8 transition-background-color-0.2s bg-opacity-60",
        isHovering && "bg-secondary bg-opacity-70"
      )}
    >
      <CardHeader>
        <h4 className="font-bold text-large">{column.name}</h4>
      </CardHeader>

      <CardBody className="min-height-500 space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={String(task._id)}
            columnId={String(column._id)}
            task={task}
            onEdit={onTaskEdit}
          />
        ))}
      </CardBody>
    </Card>
  );
};
