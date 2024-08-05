"use client";

import { useCallback, useRef } from "react";
import { useDrag } from "ahooks";
import { Card, CardBody, ChipProps, CardHeader, Chip, CardFooter, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ColumnApi, TaskApi, TaskId } from "@/types";
import { capitalize } from "@/lib";
import { EllipsisVertical } from "../icons";
import { AddEditTaskForm, CreateEditForm, TaskAction } from "./AddEditTaskForm";

export type TaskCardProps = {
  task: TaskApi;
  onEdit: (task: CreateEditForm) => void;
  onDelete: (taskId: TaskId) => void;
  column: ColumnApi;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  column,
}) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const deleteModal = useDisclosure();
  const editModalDisclosure = useDisclosure();

  const handleAction = useCallback((key: string) => {
    if (key === "edit") {
      editModalDisclosure.onOpen();
    } else if (key === "delete") {
      deleteModal.onOpen();
    }
  }, [editModalDisclosure, deleteModal]);

  const handleDeleteConfirm = useCallback(() => {
    onDelete(task._id);
    deleteModal.onOpenChange();
  }, [onDelete, task._id, deleteModal]);

  useDrag({ data: task?._id }, dragRef, {
    onDragStart: (e) => {
      e.dataTransfer.setData("taskId", String(task?._id));
      e.dataTransfer.setData("sourceColumnId", String(column._id));
    },
  });

  if (!task) return null;

  return (
    <div onClick={() => {
          editModalDisclosure.onOpen();
        }}>
      <Card ref={dragRef} className="margin-bottom-8 transition-opacity-0.2s cursor-move"
        
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
        </CardBody>
        <CardFooter>
            {task?.assignee && <span ><b>Assignee</b>: {String(task.assignee)}</span>}
            {task?.priority && (
              <Chip
                className="mb-1 ml-auto"
                color={getPriorityColor(task.priority)}
                size="sm"
              >
                {capitalize(task.priority)}
              </Chip>
          )}
        </CardFooter>
      </Card>

      <Modal isOpen={deleteModal.isOpen} onOpenChange={deleteModal.onOpenChange}>
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

      <AddEditTaskForm columns={[column]} initialData={task} onSubmit={onEdit} mode={TaskAction.EDIT} modalDisclosure={editModalDisclosure} />
    </div>
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