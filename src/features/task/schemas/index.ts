import { taskStatus } from "@/src/db/schema";
import z from "zod";

const BaseSchema = z.object({
    name: z.string().trim().min(1, { error: "Enter a task name" }).max(100, { error: "The project name can't be longer than 100 characters" }),
    description: z.string().trim().max(500, { error: "The description can't be longer than 500 characters" }).optional(),
    status: z.enum(taskStatus.enumValues)
});

export const TaskSchema = BaseSchema.pick({
    name: true,
    description: true
});

export type TaskInput = z.infer<typeof TaskSchema>;