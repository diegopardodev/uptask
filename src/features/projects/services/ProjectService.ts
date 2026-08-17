import { ProjectInput } from "../schemas";
import { IProjectRepository, projectRepository } from "./ProjectRepository";

class ProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository
    ) {}

    async createProject(data: ProjectInput, userId: string) {
        await this.projectRepository.create(data, userId);
    }

    async getAllProjects(userId: string) {
        return await this.projectRepository.findAll(userId);
    }

    async getProject(projectId: string) {
        return await this.projectRepository.findById(projectId);
    }

    async editProject(data: ProjectInput, userId: string, projectId: string) {
        await this.projectRepository.update(data, userId, projectId);
    }
}

export const projectService = new ProjectService(projectRepository);