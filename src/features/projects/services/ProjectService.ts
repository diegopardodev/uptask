import { Paginated } from "@/src/shared/types/pagination";
import { PROJECTS_PER_PAGE } from "../constants";
import { ProjectInput } from "../schemas";
import { IProjectRepository, projectRepository } from "./ProjectRepository";
import { SelectProject } from "../types";

class ProjectService {
    constructor(
        private readonly projectRepository: IProjectRepository
    ) {}

    async createProject(data: ProjectInput, userId: string) {
        await this.projectRepository.create(data, userId);
    }

    async getAllProjects(userId: string, page: number): Promise<Paginated<SelectProject>> {
        const total = await this.projectRepository.countAll(userId);
        const totalPages = Math.max(1, Math.ceil(total / PROJECTS_PER_PAGE));
        const currentPage = Math.min(page, totalPages);
        const offset = (page - 1) * PROJECTS_PER_PAGE;
        const items = await this.projectRepository.findAll(userId, PROJECTS_PER_PAGE, offset);

        return {
            items,
            page: currentPage,
            totalPages,
            total
        };
    }

    async getProject(userId: string, projectId: string) {
        return await this.projectRepository.findById(userId, projectId);
    }

    async editProject(data: ProjectInput, userId: string, projectId: string) {
        await this.projectRepository.update(data, userId, projectId);
    }

    async deleteProject(userId: string, projectId: string) {
        await this.projectRepository.delete(userId, projectId);
    }
}

export const projectService = new ProjectService(projectRepository);