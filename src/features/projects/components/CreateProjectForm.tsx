import { FormError, FormInput, FormLabel, FormTextarea } from "@/src/shared/components/forms";
import { useFormContext } from "react-hook-form";
import { CreateProjectInput } from "../schemas";

export default function CreateProjectForm() {
    const { register, formState: { errors } } = useFormContext<CreateProjectInput>();

    return (
        <>
            <div className="space-y-2">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                    id="name"
                    type="text"
                    placeholder="Brand Identity Refresh"
                    autoComplete="off"
                    error={errors.name ? true : false}
                    {...register("name")}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="client">Client</FormLabel>
                <FormInput
                    id="client"
                    type="text"
                    placeholder="Stripe"
                    autoComplete="off"
                    error={errors.client ? true : false}
                    {...register("client")}
                />
                {errors.client && <FormError>{errors.client.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="description">Description <span className="text-gray-500">(optional)</span></FormLabel>
                <FormTextarea
                    id="description"
                    placeholder="What is this project about? Scope, deadlines, anything the team should know."
                    autoComplete="off"
                    error={errors.description ? true : false}
                    {...register("description")}
                />
                {errors.description && <FormError>{errors.description.message}</FormError>}
            </div>
        </>
    );
}
