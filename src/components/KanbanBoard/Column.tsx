"use client";

import { Children, useRef, useState } from "react";
import { useDrop } from "ahooks";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import classNames from "classnames";

import { TaskCard } from "./TaskCard";

import { ColumnStatus, Task, TaskId } from "@/types";

export type ColumnProps = {
  className?: string;
  column: ColumnStatus;
  tasks: Task[];
  index: number;
  onTaskEdit: (taskId: TaskId, updatedTask: Partial<Task>) => void;
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

      if (sourceColumnId && taskId && sourceColumnId !== column.id) {
        onTaskMove(taskId, sourceColumnId, column.id);
      }
      setIsHovering(false);
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  });

  return (
    <Card
      ref={dropRef}
      className={classNames(
        "width-250 margin-0-8 transition-background-color-0.2s bg-opacity-60",
        isHovering && "bg-secondary bg-opacity-70"
      )}
    >
      <CardHeader>
        <h4 className="font-bold text-large">{column?.title}</h4>
      </CardHeader>

      <CardBody className="min-height-500 space-y-4">
        {Children.toArray(
tasks.map((task) => (
          <TaskCard
            columnId={String(column.id)}
            task={task}
            onEdit={onTaskEdit}
          />
        ))
        )}
      </CardBody>
    </Card>
  );
};
