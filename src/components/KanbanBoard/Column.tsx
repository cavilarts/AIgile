"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { useDrop } from "ahooks";
import classNames from "classnames";
import { Children, useRef, useState } from "react";
import { TaskCard } from "./TaskCard";
import { ColumnApi, TaskApi, TaskId } from "@/types";
import { CreateEditForm } from "./AddEditTaskForm";

export type ColumnProps = {
  className?: string;
  column: ColumnApi;
  tasks: TaskApi[];
  index: number;
  onTaskEdit: (task: CreateEditForm) => void;
  onTaskDelete: (taskId: TaskId) => void;
  onTaskMove: (
    taskId: TaskId,
    sourceColumn: string,
    targetColumn: string
  ) => void;
};

export const Column: React.FC<ColumnProps> = ({
  className,
  column,
  tasks,
  onTaskEdit,
  onTaskDelete,
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

  return (
    <Card
      ref={dropRef}
      className={classNames(
        "width-250 margin-0-8 transition-background-color-0.2s bg-opacity-60",
        isHovering && "bg-secondary bg-opacity-70",
        className
      )}
    >
      <CardHeader>
        <h4 className="font-bold text-large">{column.name}</h4>
      </CardHeader>

      <CardBody className="min-height-500 space-y-4">
        {Children.toArray(
          tasks.map((task) => (
            <TaskCard
              key={String(task._id)}
              column={column}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))
        )}
      </CardBody>
    </Card>
  );
};
