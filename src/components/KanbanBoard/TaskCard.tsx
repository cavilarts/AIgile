"use client";

import { useCallback, useRef } from "react";
import { useDrag } from "ahooks";
import { Card, CardBody, ChipProps, CardHeader, Chip, CardFooter, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { TaskApi, TaskId } from "@/types";
import { capitalize } from "@/lib";
import { EllipsisVertical } from "../icons";

export type TaskCardProps = {
  task: TaskApi;
  onEdit: (taskId: TaskId, updatedTask: Partial<TaskApi>) => void;
  columnId: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  columnId,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleAction = useCallback((key: string) => {
    if (key === "edit") {
      // Handle edit action
      console.log("Edit task", task._id);
    } else if (key === "delete") {
      onOpen(); // Open the confirmation modal
    }
  }, [task._id, onOpen]);

  const handleDeleteConfirm = useCallback(() => {
    console.log("Deleting task", task._id);
    // Implement your delete logic here
    onOpenChange(false); // Close the modal
  }, [task._id, onOpenChange]);

  useDrag({ data: task?._id }, dragRef, {
    onDragStart: (e) => {
      e.dataTransfer.setData("taskId", String(task?._id));
      e.dataTransfer.setData("sourceColumnId", columnId);
    },
  });

  if (!task) return null;

  return (
    <>
      <Card
        ref={dragRef}
        className="margin-bottom-8 transition-opacity-0.2s cursor-move"
      >
        <CardHeader className="relative overflow-visible flex justify-between items-center">
          <h5 className="font-bold text-large">{task.title}</h5>

          <Dropdown className="float-right">
            <DropdownTrigger>
              <Button
                isIconOnly
                size="sm"
                variant="light"
              >
                <EllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu onAction={(key) => handleAction(key as string)}>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>

        <CardBody className="text-sm">
          <p>{task.description}</p>
          {task?.assignee && <span>Assignee: {String(task.assignee)}</span>}
        </CardBody>
        <CardFooter>
          <div>
            {task?.priority && (
              <Chip
                className="ml-2 mb-1"
                color={getPriorityColor(task.priority)}
                size="sm"
              >
                {capitalize(task.priority)}
              </Chip>
            )}
          </div>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Confirm Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this task?</p>
                <p>Task: {task.title}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDeleteConfirm}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const getPriorityColor = (
  priority: "low" | "medium" | "high"
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