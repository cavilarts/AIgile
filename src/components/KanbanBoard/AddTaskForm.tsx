import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  SelectItem,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import dynamic from "next/dynamic";

import { ColumnStatus, Task } from "@/types";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";

interface AddTaskFormProps {
  onTaskCreate: (task: Omit<Task, "id" | "createdAt">) => void;
  columns: ColumnStatus[];
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onTaskCreate,
  columns,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleSubmit = () => {
    if (!title.trim()) {
      // Show error message
      return;
    }

    const newTask: Omit<Task, "id" | "createdAt"> = {
      title: title.trim(),
      description,
      status,
      assignee: assignee.trim(),
      priority,
    };

    onTaskCreate(newTask);
    onOpenChange();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("");
    setAssignee("");
    setPriority("medium");
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Task
      </Button>

      <Modal
        isOpen={isOpen}
        size="2xl"
        onClose={() => {
          onOpenChange();
          resetForm();
        }}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader>
            <h3>Add New Task</h3>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  className="mb-4"
                  label="Title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="mb-4">
                  <label className="block mb-2">Description</label>
                  <ReactQuill
                    style={{ height: "200px" }}
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <Select
                  className="mb-4"
                  label="Status"
                  placeholder="Select status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {columns.map((column) => (
                    <SelectItem key={column.id} value={column.id}>
                      {column.title}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  className="mb-4"
                  label="Assignee"
                  placeholder="Enter assignee name"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                />
                <Select
                  label="Priority"
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value as "low" | "medium" | "high")
                  }
                >
                  <SelectItem key="low" value="low">
                    Low
                  </SelectItem>
                  <SelectItem key="medium" value="medium">
                    Medium
                  </SelectItem>
                  <SelectItem key="high" value="high">
                    High
                  </SelectItem>
                </Select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => onOpenChange()}
            >
              Cancel
            </Button>
            <Button color="primary" onPress={handleSubmit}>
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
