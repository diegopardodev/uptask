"use server";

import { actionError, actionOk } from "@/src/shared/types/result";
import { ProjectInput, ProjectSchema } from "../schemas";
import { projectService } from "../services/ProjectService";
import { requireSession } from "@/src/shared/utils/auth-server";
import { ProjectPolicy } from "../policies/ProjectPolicy";

export async function createProjectAction(input: ProjectInput) {
    const session = await requireSession();

    const data = ProjectSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await projectService.createProject(data.data, session.user.id);
    return actionOk("Project created.");
}

export async function editProjectAction(input: ProjectInput, projectId: string) {
    const session = await requireSession();

    const project = await projectService.getProject(projectId);
    if (!project || !ProjectPolicy.canEdit(session.user, project)) {
        return actionError("You can't edit this project.");
    }

    const data = ProjectSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await projectService.editProject(data.data, projectId);
    return actionOk("Project updated.");
}