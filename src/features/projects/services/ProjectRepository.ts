import { and, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { ProjectInput } from "../schemas";
import { projects } from "@/src/db/schema/projects";
import { SelectProject } from "../types";

export interface IProjectRepository {
    create(data: ProjectInput, userId: string): Promise<void>;
    findAll(userId: string): Promise<SelectProject[]>;
    findById(userId: string, projectId: string): Promise<SelectProject>;
    update(data: ProjectInput, userId: string, projectId: string): Promise<void>;
    delete(userId: string, projectId: string): Promise<void>;
}

class ProjectRepository implements IProjectRepository {
    async create(data: ProjectInput, userId: string): Promise<void> {
        await db.insert(projects).values({
            ...data,
            createdBy: userId
        });
    }

    async findAll(userId: string): Promise<SelectProject[]> {
        return await db.select().from(projects).where(eq(projects.createdBy, userId));
    }

    async findById(userId: string, projectId: string): Promise<SelectProject> {
        const [result] = await db.select().from(projects).where(and(eq(projects.id, projectId), eq(projects.createdBy, userId)));
        return result;
    }

    async update(data: ProjectInput, userId: string, projectId: string): Promise<void> {
        await db.update(projects).set(data).where(and(eq(projects.id, projectId), eq(projects.createdBy, userId)));
    }

    async delete(userId: string, projectId: string): Promise<void> {
        await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.createdBy, userId)));
    }
}

export const projectRepository = new ProjectRepository();