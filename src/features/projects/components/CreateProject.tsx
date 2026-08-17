"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CreateProjectForm from "./CreateProjectForm";
import { CreateProjectInput, CreateProjectSchema } from "../schemas";
import { createProjectAction } from "../actions";

export default function CreateProject() {
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(CreateProjectSchema),
        mode: "all"
    });

    const onSubmit = async (data: CreateProjectInput) => {
        const response = await createProjectAction(data);
        if (!response.ok) return toast.error(response.error);

        toast.success(response.message);
        router.push("/projects");
    }

    return (
        <FormProvider {...methods}>
            <Form className="mt-10" onSubmit={methods.handleSubmit(onSubmit)}>
                <CreateProjectForm />
                <FormSubmit loading={methods.formState.isSubmitting}>{ methods.formState.isSubmitting ? "Creating project…" : "Create project" }</FormSubmit>
            </Form>
        </FormProvider>
    );
}
