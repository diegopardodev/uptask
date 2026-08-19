import { db } from "@/src/db";
import { TaskInput } from "../schemas";
import { tasks } from "@/src/db/schema";

export interface ITaskRepository {
    create(data: TaskInput, projectId: string): Promise<void>;
}

class TaskRepository implements ITaskRepository {
    async create(data: TaskInput, projectId: string): Promise<void> {
        await db.insert(tasks).values({
            ...data,
            projectId
        });
    }
}

export const taskRepository = new TaskRepository();