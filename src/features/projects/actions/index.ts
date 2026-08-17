"use server";

import { redirect } from "next/navigation";
import { actionError, actionOk } from "@/src/shared/types/result";
import { CreateProjectInput, CreateProjectSchema } from "../schemas";
import { projectService } from "../services/ProjectService";
import { getSession } from "@/src/shared/utils/auth-server";

export async function createProjectAction(input: CreateProjectInput) {
    const session = await getSession();
    if (!session) return redirect("/auth/sign-in");

    const data = CreateProjectSchema.safeParse(input);
    if (!data.success) return actionError("Check the form and try again.");

    await projectService.createProject(data.data, session.user.id);
    return actionOk("Project created");
}