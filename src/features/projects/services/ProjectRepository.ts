import { db } from "@/src/db";
import { CreateProjectInput } from "../schemas";
import { projects } from "@/src/db/schema/projects";

export interface IProjectRepository {
    create(data: CreateProjectInput, userId: string): Promise<void>;
}

class ProjectRepository implements IProjectRepository {
    async create(data: CreateProjectInput, userId: string): Promise<void> {
        await db.insert(projects).values({
            ...data,
            createdBy: userId
        });
    }
}

export const projectRepository = new ProjectRepository();