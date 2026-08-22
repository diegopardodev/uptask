import { taskStatus } from "@/src/db/schema";
import { SelectTask, TasksByStatus } from "../types";

export function groupTasksByStatus(tasks: SelectTask[]): TasksByStatus {
    const grouped = Object.fromEntries(taskStatus.enumValues.map(status => [status, []])) as unknown as TasksByStatus;

    for (const task of tasks) grouped[task.status].push(task);

    return grouped;
}