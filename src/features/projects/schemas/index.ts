import z from "zod";

const BaseSchema = z.object({
    name: z.string().trim().min(1, { error: "Enter a project name" }).max(100, { error: "The project name can't be longer than 100 characters" }),
    client: z.string().trim().min(1, { error: "Enter a client name" }).max(100, { error: "The client name can't be longer than 100 characters" }),
    description: z.string().trim().max(500, { error: "The description can't be longer than 500 characters" }).optional()
});

export const ProjectSchema = BaseSchema.pick({
    name: true,
    client: true,
    description: true
});

export const ProjectIdSchema = z.object({
    id: z.uuid()
});

export const ProjectsSearchParamsSchema = z.object({
    page: z.coerce.number().int().positive().catch(1)
});

export const ProjectTabSearchParamsSchema = z.object({
    tab: z.enum(["overview", "tasks", "team"]).catch("overview")
});

export type ProjectInput = z.infer<typeof ProjectSchema>;