import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { CreateProjectInput } from "../schemas";
import { projects } from "@/src/db/schema/projects";
import { SelectProject } from "../types";

export interface IProjectRepository {
    create(data: CreateProjectInput, userId: string): Promise<void>;
    findAll(userId: string): Promise<SelectProject[]>;
}

class ProjectRepository implements IProjectRepository {
    async create(data: CreateProjectInput, userId: string): Promise<void> {
        await db.insert(projects).values({
            ...data,
            createdBy: userId
        });
    }

    async findAll(userId: string): Promise<SelectProject[]> {
        return await db.select().from(projects).where(eq(projects.createdBy, userId));
    }
}

export const projectRepository = new ProjectRepository();