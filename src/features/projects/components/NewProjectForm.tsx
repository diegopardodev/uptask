"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormError, FormInput, FormLabel, FormSubmit, FormTextarea } from "@/src/shared/components/forms";
import { NewProjectInput, NewProjectSchema } from "../schemas";

export default function NewProjectForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(NewProjectSchema),
        mode: "all"
    });

    const onSubmit = async (data: NewProjectInput) => {
        console.log(data);
    };

    return (
        <Form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <FormLabel htmlFor="project_name">Project name</FormLabel>
                <FormInput
                    id="project_name"
                    type="text"
                    placeholder="Adidas landing page"
                    autoComplete="off"
                    error={errors.projectName ? true : false}
                    {...register("projectName")}
                />
                {errors.projectName && <FormError>{errors.projectName.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="client_name">Client name</FormLabel>
                <FormInput
                    id="client_name"
                    type="text"
                    placeholder="Adidas"
                    autoComplete="off"
                    error={errors.clientName ? true : false}
                    {...register("clientName")}
                />
                {errors.clientName && <FormError>{errors.clientName.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="description">Description <span className="text-gray-500 text-sm">(optional)</span></FormLabel>
                <FormTextarea
                    id="description"
                    autoComplete="off"
                    error={errors.description ? true : false}
                    {...register("description")}
                />
                {errors.description && <FormError>{errors.description.message}</FormError>}
            </div>

            <FormSubmit loading={isSubmitting}>
                { isSubmitting ? "Creating project…" : "Create project" }
            </FormSubmit>
        </Form>
    );
}
