import { and, count, desc, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { ProjectInput } from "../schemas";
import { projects } from "@/src/db/schema/projects";
import { SelectProject, SelectProjectWithManager } from "../types";

export interface IProjectRepository {
    create(data: ProjectInput, userId: string): Promise<void>;
    findAll(userId: string, limit: number, offset: number): Promise<SelectProject[]>;
    findById(projectId: string): Promise<SelectProjectWithManager | undefined>;
    update(data: ProjectInput, userId: string, projectId: string): Promise<void>;
    delete(userId: string, projectId: string): Promise<boolean>;
    countAll(userId: string): Promise<number>;
}

class ProjectRepository implements IProjectRepository {
    async create(data: ProjectInput, userId: string): Promise<void> {
        await db.insert(projects).values({
            ...data,
            createdBy: userId
        });
    }

    async findAll(userId: string, limit: number, offset: number): Promise<SelectProject[]> {
        return await db.select().from(projects).where(eq(projects.createdBy, userId)).orderBy(desc(projects.createdAt), desc(projects.id)).limit(limit).offset(offset);
    }

    async countAll(userId: string): Promise<number> {
        const [total] = await db.select({ total: count() }).from(projects).where(eq(projects.createdBy, userId));
        return total.total;
    }

    async findById(projectId: string): Promise<SelectProjectWithManager | undefined> {
        const result = await db.query.projects.findFirst({
            where: {
                AND: [
                    { id: { eq: projectId } },
                ]
            },
            with: {
                manager: true
            }
        });

        return result;
    }

    async update(data: ProjectInput, userId: string, projectId: string): Promise<void> {
        await db.update(projects).set(data).where(and(eq(projects.id, projectId), eq(projects.createdBy, userId)));
    }

    async delete(userId: string, projectId: string): Promise<boolean> {
        const deletedProjects = await db
            .delete(projects)
            .where(and(eq(projects.id, projectId), eq(projects.createdBy, userId)))
            .returning({ id: projects.id });

        return deletedProjects.length > 0;
    }
}

export const projectRepository = new ProjectRepository();
