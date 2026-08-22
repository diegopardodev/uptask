import { TaskInput } from "../schemas";
import { ITaskRepository, taskRepository } from "./taskRepository";

class TaskService {
    constructor(
        private readonly taskRepository: ITaskRepository
    ) {}

    async createTask(data: TaskInput, projectId: string) {
        await this.taskRepository.create(data, projectId);
    }

    async getProjectTasks(projectId: string) {
        return await this.taskRepository.findAllByProject(projectId);
    }
}

export const taskService = new TaskService(taskRepository);