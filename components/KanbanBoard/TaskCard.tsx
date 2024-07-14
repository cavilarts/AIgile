import { useRef } from "react";
import { useDrag } from "ahooks";
import { Card, CardBody, ChipProps, CardHeader, Chip } from "@nextui-org/react";

import { Task, TaskId } from "@/types";
import { capitalize } from "@/lib";

export type TaskCardProps = {
  task: Task;
  onEdit: (taskId: TaskId, updatedTask: Partial<Task>) => void;
  columnId: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  columnId,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);

  useDrag({ data: task.id }, dragRef, {
    onDragStart: (e) => {
      e.dataTransfer.setData("taskId", task.id);
      e.dataTransfer.setData("sourceColumnId", columnId);
    },
  });

  return (
    <Card
      ref={dragRef}
      className="margin-bottom-8 transition-opacity-0.2s cursor-move"
    >
      <CardHeader className="relative overflow-visible">
        <div className="w-full">
          <Chip
            className="float-right ml-2 mb-1"
            color={getPriorityColor(task.priority)}
            size="sm"
          >
            {capitalize(task.priority)}
          </Chip>
          <h5 className="font-bold text-large">{task.title}</h5>
        </div>
      </CardHeader>
      <CardBody className="text-sm">
        <p>{task.description}</p>
        {task.assignee && <span>Assignee: {task.assignee}</span>}
      </CardBody>
    </Card>
  );
};

const getPriorityColor = (
  priority: "low" | "medium" | "high",
): ChipProps["color"] => {
  switch (priority) {
    case "low":
      return "success";
    case "medium":
      return "warning";
    case "high":
      return "danger";
  }
};
