import { CreateProjectInput } from "../schemas";
import { IProjectRepository, projectRepository } from "./ProjectRepository";

class ProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository
    ) {}

    async createProject(data: CreateProjectInput, userId: string) {
        await this.projectRepository.create(data, userId);
    }

    async getAllProjects(userId: string) {
        return await this.projectRepository.findAll(userId);
    }

    async getProject(projectId: string) {
        return await this.projectRepository.findById(projectId);
    }
}

export const projectService = new ProjectService(projectRepository);