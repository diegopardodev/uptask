import { useFormContext } from "react-hook-form";
import { FormError, FormInput, FormLabel, FormTextarea } from "@/src/shared/components/forms";
import { TaskInput } from "../schemas";

export default function CreateTaskForm() {
    const { register, formState: { errors } } = useFormContext<TaskInput>();

    return (
        <>
            <div className="space-y-2">
                <FormLabel htmlFor="name">Task name</FormLabel>
                <FormInput
                    type="text"
                    id="name"
                    placeholder="Design the hero section"
                    autoComplete="off"
                    error={errors.name ? true : false}
                    {...register("name")}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <div className="space-y-2">
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormTextarea
                    id="description"
                    placeholder="What needs to happen, and what does done look like"
                    autoComplete="off"
                    error={errors.description ? true : false}
                    {...register("description")}
                />
                {errors.description && <FormError>{errors.description.message}</FormError>}
            </div>
        </>
    );
}
