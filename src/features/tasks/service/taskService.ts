import { TaskInput } from "../schemas";
import { ITaskRepository, taskRepository } from "./taskRepository";

class TaskService {
    constructor(
        private readonly taskRepository: ITaskRepository
    ) {}

    async createTask(data: TaskInput, projectId: string) {
        await this.taskRepository.create(data, projectId);
    }

    async getAllTasks(projectId: string) {
        return await this.taskRepository.findAll(projectId);
    }
}

export const taskService = new TaskService(taskRepository);