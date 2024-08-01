import { ColumnApi, Optional, TaskApi } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import TurndownService from 'turndown';

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
const turndownService = new TurndownService();

import "react-quill/dist/quill.snow.css";
import { useMount } from "ahooks";

export type CreateEditForm = Omit<
  Optional<TaskApi, '_id'>,
  "createdAt" | "createdBy"
>;

export enum TaskAction {
  ADD = "add",
  EDIT = "edit",
}

type AddTaskFormProps = {
  onSubmit: ((task: CreateEditForm) => void);
  columns: ColumnApi[];
  mode: TaskAction;
  modalDisclosure: ReturnType<typeof useDisclosure>;
  initialData?: CreateEditForm;
};

const schema = yup.object().shape({
  taskId: yup.string(),
  title: yup.string().required("Title is required"),
  column: yup.string().when("$mode", {
    is: "edit",
    then: (schema) => schema.required("Status is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  assignee: yup.string(),
  description: yup.string(),
  markdownDescription: yup.string(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
});

type FormData = yup.InferType<typeof schema>;

export const AddEditTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit: onTaskSubmit,
  columns,
  mode,
  modalDisclosure: { isOpen, onOpenChange },
  initialData
}) => {
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    context: { mode },
    defaultValues: {
      title: "",
      column: "",
      description: "",
      markdownDescription: "",
      assignee: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormData) => {
    const mappedData: CreateEditForm = {
      _id: data.taskId,
      assignee: data.assignee,
      columnId: columns[0]._id,
      boardId: columns[0].boardId,
      projectId: columns[0].projectId,
      priority: data.priority as "low" | "medium" | "high",
      title: data.title,
      description: data.markdownDescription ?? "",
      tags: [],
    };

    onTaskSubmit(mappedData);
    onOpenChange();
    reset();
  };

  const storeMarkdown = (htmlContent: string | TurndownService.Node) => {
    setValue("markdownDescription", turndownService.turndown(htmlContent));
  };

  useMount(() => {
    if (initialData) {
      console.log("initialData", initialData);
      if (initialData._id) setValue("taskId", String(initialData._id));

      setValue("title", initialData.title);
      setValue("description", initialData.description);
      if(initialData.columnId) setValue("column", String(initialData.columnId));
      if (initialData.assignee) setValue("assignee", String(initialData.assignee));
      if (initialData.priority) setValue("priority", initialData.priority);
    }
  })

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          onOpenChange();
          reset();
        }}
        size="4xl"
      >
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              {mode === "edit" ? <h3>Edit Task</h3> : <h3>Add New Task</h3>}
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
                          {...field}
                          theme="snow"
                          style={{ height: "200px" }}
                          onChange={(content, delta, source, editor) => {
                            field.onChange(content);
                            storeMarkdown(content);
                          }}
                          modules={{
                            toolbar: [
                              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                              [{ 'script': 'sub' }, { 'script': 'super' }],
                              [{ 'indent': '-1' }, { 'indent': '+1' }, { 'direction': 'rtl' }],
                              [{ 'color': [] }, { 'background': [] }],
                              [{ 'align': [] }],
                              ['link', 'image', 'video'],
                              ['clean']
                            ]
                          }}
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
                      name="column"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultSelectedKeys={field.value ? [field.value] : []}
                          label="Status"
                          placeholder="Select status"
                          errorMessage={errors.column?.message}
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
                        defaultSelectedKeys={[field.value]}
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
                {mode === "edit" ? "Update Task" : "Add Task"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
