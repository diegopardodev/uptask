"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import { ProjectInput, ProjectSchema } from "../schemas";
import { createProjectAction, editProjectAction } from "../actions";
import { SelectProject } from "../types";
import EditProjectForm from "./EditProjectForm";

type Props = {
    project: SelectProject;
}

export default function EditProject({project}: Props) {
    const router = useRouter();

    const methods = useForm({
        resolver: zodResolver(ProjectSchema),
        mode: "all",
        defaultValues: {
            name: project.name,
            client: project.client,
            description: project.description ?? ""
        }
    });

    const onSubmit = async (data: ProjectInput) => {
        const response = await editProjectAction(data, project.id);
        if (!response.ok) return toast.error(response.error);

        toast.success(response.message);
        router.push("/projects");
    };

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <EditProjectForm />
                <FormSubmit loading={methods.formState.isSubmitting}>{ methods.formState.isSubmitting ? "Saving changes…" : "Save changes" }</FormSubmit>
            </Form>
        </FormProvider>
    );
}
