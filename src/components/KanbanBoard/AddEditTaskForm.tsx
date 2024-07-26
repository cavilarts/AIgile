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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ColumnApi, ColumnStatus, TaskApi } from "@/types";
import * as yup from "yup";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

import "react-quill/dist/quill.snow.css";
import { Status } from "@/constants/status";

export type onTaskCreateParams = Omit<
  TaskApi,
  "_id" | "createdAt" | "projectId" | "createdBy"
>;

type AddTaskFormProps = {
  onTaskCreate: (task: onTaskCreateParams) => void;
  columns: ColumnApi[];
  mode?: "add" | "edit";
};

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  status: yup.string().when("$mode", {
    is: "edit",
    then: (schema) => schema.required("Status is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  assignee: yup.string(),
  description: yup.string(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
});

type FormData = yup.InferType<typeof schema>;

export const AddEditTaskForm: React.FC<AddTaskFormProps> = ({
  onTaskCreate,
  columns,
  mode,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    context: { mode },
    defaultValues: {
      title: "",
      status: "",
      description: "",
      assignee: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormData) => {
    const mappedData: onTaskCreateParams = {
      // TODO: Fix column for edit
      columnId: mode === "edit" && data.status ? data.status : columns[0]._id,
      boardId: columns[0].boardId,
      priority: data.priority as "low" | "medium" | "high",
      title: data.title,
      description: data.description ?? "",
      tags: [],
    };
    onTaskCreate(mappedData);
    onOpenChange();
    reset();
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add New Task
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          onOpenChange();
          reset();
        }}
        size="2xl"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <h3>Add New Task</h3>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Title"
                        isRequired
                        placeholder="Enter task title"
                        className="mb-4"
                        isInvalid={Boolean(errors.title)}
                        errorMessage={errors.title?.message}
                      />
                    )}
                  />
                  <div />
                  <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          theme="snow"
                          {...field}
                          style={{ height: "200px" }}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/3">
                  {mode === "edit" && (
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Status"
                          placeholder="Select status"
                          errorMessage={errors.status?.message}
                          className="mb-4"
                        >
                          {columns.map((column) => (
                            <SelectItem
                              key={String(column._id)}
                              value={String(column._id)}
                            >
                              {column.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  )}

                  <Controller
                    name="assignee"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Assignee"
                        placeholder="Enter assignee name"
                        errorMessage={errors.assignee?.message}
                        isRequired
                        isInvalid={Boolean(errors.assignee)}
                        className="mb-4"
                      />
                    )}
                  />
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Priority"
                        errorMessage={errors.priority?.message}
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
                    )}
                  />
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
              <Button color="primary" type="submit">
                Add Task
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
