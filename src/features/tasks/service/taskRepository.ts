import { db } from "@/src/db";
import { TaskInput } from "../schemas";
import { tasks } from "@/src/db/schema";
import { SelectTask } from "../types";
import { desc, eq } from "drizzle-orm";

export interface ITaskRepository {
    create(data: TaskInput, projectId: string): Promise<void>;
    findAllByProject(projectId: string): Promise<SelectTask[]>;
}

class TaskRepository implements ITaskRepository {
    async create(data: TaskInput, projectId: string): Promise<void> {
        await db.insert(tasks).values({
            ...data,
            projectId
        });
    }

    async findAllByProject(projectId: string): Promise<SelectTask[]> {
        return await db.select().from(tasks).where(eq(tasks.projectId, projectId)).orderBy(desc(tasks.createdAt));
    }
}

export const taskRepository = new TaskRepository();