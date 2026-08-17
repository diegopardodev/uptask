import { CreateProjectInput } from "../schemas";
import { IProjectRepository, projectRepository } from "./ProjectRepository";

class ProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository
    ) {}

    async createProject(data: CreateProjectInput, userId: string) {
        await this.projectRepository.create(data, userId);
    }
}

export const projectService = new ProjectService(projectRepository);