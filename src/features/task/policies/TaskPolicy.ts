import { User } from "better-auth";
import { SelectProject } from "../../projects/types";
import { SelectTask } from "../types";
import { ProjectPolicy } from "../../projects/policies/ProjectPolicy";

export class TaskPolicy {
    static belongsTo(task: SelectTask, project: SelectProject): boolean {
        return task.projectId === project.id;
    }

    static canView(user: User, task: SelectTask, project: SelectProject): boolean {
        return TaskPolicy.belongsTo(task, project) && ProjectPolicy.canView(user, project);
    }

    static canEdit(user: User, task: SelectTask, project: SelectProject): boolean {
        return TaskPolicy.belongsTo(task, project) && ProjectPolicy.isAdmin(user, project);
    }

    static canDelete(user: User, task: SelectTask, project: SelectProject): boolean {
        return TaskPolicy.belongsTo(task, project) && ProjectPolicy.canView(user, project);
    }

    static canChanceStatus(user: User, task: SelectTask, project: SelectProject) {
        return TaskPolicy.belongsTo(task, project) && ProjectPolicy.isMember(user, project);
    }
}