import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { TaskInput, TaskSchema } from "../schemas";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CreateTaskForm from "./CreateTaskForm";
import { useTaskStore } from "../store";
import { createTaskAction } from "../actions";
import { useParams } from "next/navigation";

export default function CreateTask() {
    const { setOpen } = useTaskStore();
    const { id: projectId } = useParams<{ id: string }>();

    const methods = useForm({
        resolver: zodResolver(TaskSchema),
        mode: "all"
    });

    const onSubmit = async (data: TaskInput) => {
        const response = await createTaskAction(data, projectId);

        if (!response.ok) return toast.error(response.error);

        methods.reset();
        toast.success(response.message);
        setOpen(false);
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)} aria-live={methods.formState.isSubmitting ? "polite" : "off"}>
                <legend className="flex justify-between border-b border-b-gray-200 pb-2">
                    <p className="font-bold">New task</p>
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="hover:cursor-pointer"
                    >
                        <XMarkIcon className="size-4 text-gray-500" />
                    </button>
                </legend>
                <CreateTaskForm />
                <FormSubmit loading={methods.formState.isSubmitting}>{ methods.formState.isSubmitting ? "Creating task…" : "Create task" }</FormSubmit>
            </Form>
        </FormProvider>
    );
}
