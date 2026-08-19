"use server";

import { revalidatePath } from "next/cache";
import { actionError, actionOk } from "@/src/shared/types/result";
import { TaskInput, TaskSchema } from "../schemas";
import { taskService } from "../service/taskService";
import { requireSession } from "@/src/shared/utils/auth-server";
import { projectService } from "@/src/features/projects/services/ProjectService";
import { ProjectPolicy } from "@/src/features/projects/policies/ProjectPolicy";

export async function createTaskAction(input: TaskInput, projectId: string) {
    const session = await requireSession();

    const project = await projectService.getProject(projectId);
    if (!project || !ProjectPolicy.canAddTask(session.user, project)) {
        return actionError("You can't add tasks to this project.");
    }

    const data = TaskSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await taskService.createTask(data.data, projectId);
    revalidatePath("/projects/[id]", "page");
    return actionOk("Task created.");
}