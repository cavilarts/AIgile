import { ColumnApi, TaskApi } from "@/types";
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

export type onTaskCreateParams = Omit<
  TaskApi,
  "_id" | "createdAt" | "createdBy"
>;

export enum TaskAction {
  ADD = "add",
  EDIT = "edit",
}

type AddTaskFormProps = {
  onSubmit: (task: onTaskCreateParams, mode: TaskAction) => void;
  columns: ColumnApi[];
  mode: TaskAction;
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
  markdownDescription: yup.string(),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high"])
    .required("Priority is required"),
});

type FormData = yup.InferType<typeof schema>;

export const AddEditTaskForm: React.FC<AddTaskFormProps> = ({
  onSubmit: onTaskCreate,
  columns,
  mode,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    context: { mode },
    defaultValues: {
      title: "",
      status: "",
      description: "",
      markdownDescription: "",
      assignee: "",
      priority: "medium",
    },
  });

  const onSubmit = (data: FormData) => {
    const mappedData: onTaskCreateParams = {
      // TODO: Fix column for edit
      columnId: mode === "edit" && data.status ? data.status : columns[0]._id,
      boardId: columns[0].boardId,
      projectId: columns[0].projectId,
      priority: data.priority as "low" | "medium" | "high",
      title: data.title,
      description: data.markdownDescription ?? "",
      tags: [],
    };
    onTaskCreate(mappedData, mode);
    onOpenChange();
    reset();
  };

  const storeMarkdown = (htmlContent: string | TurndownService.Node) => {
    setValue("markdownDescription", turndownService.turndown(htmlContent));
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
        size="4xl"
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
