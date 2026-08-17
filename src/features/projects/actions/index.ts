"use server";

import { actionError, actionOk } from "@/src/shared/types/result";
import { ProjectInput, ProjectSchema } from "../schemas";
import { projectService } from "../services/ProjectService";
import { requireSession } from "@/src/shared/utils/auth-server";

export async function createProjectAction(input: ProjectInput) {
    const session = await requireSession();

    const data = ProjectSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await projectService.createProject(data.data, session.user.id);
    return actionOk("Project created.");
}

export async function editProjectAction(input: ProjectInput, projectId: string) {
    const session = await requireSession();

    const data = ProjectSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await projectService.editProject(input, session.user.id, projectId);
    return actionOk("Project updated.");
}