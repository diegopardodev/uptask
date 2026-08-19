"use server";

import { revalidatePath } from "next/cache";
import { actionError, actionOk } from "@/src/shared/types/result";
import { TaskInput, TaskSchema } from "../schemas";
import { taskService } from "../service/taskService";

export async function createTaskAction(input: TaskInput, projectId: string) {
    const data = TaskSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await taskService.createTask(data.data, projectId);
    revalidatePath("/projects/[id]?tab=tasks", "page");
    return actionOk("Task created.");
}