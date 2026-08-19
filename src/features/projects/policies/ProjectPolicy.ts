import { User } from "better-auth";
import { SelectProject } from "../types";

export class ProjectPolicy {
    static isAdmin(user: User, project: SelectProject): boolean {
        return user.id === project.createdBy;
    }

    static isMember(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }

    static canView(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }

    static canEdit(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }

    static canDelete(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }

    static canAddTask(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }

    static canManageTeam(user: User, project: SelectProject): boolean {
        return this.isAdmin(user, project);
    }
}