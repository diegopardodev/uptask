import { taskStatus } from "@/src/db/schema";
import { classNames } from "@/src/shared/utils/ui";
import { SelectTask } from "../types";
import { groupTasksByStatus } from "../utils/groupTasksByStatus";
import TaskCard from "./TaskCard";

const statusLabels: Record<(typeof taskStatus.enumValues[number]), string> = {
    PENDING: "Pending",
    ON_HOLD: "On hold",
    IN_PROGRESS: "In progress",
    UNDER_REVIEW: "Under review",
    COMPLETED: "Completed"
};

const classes: Record<(typeof taskStatus.enumValues[number]), string> = {
    PENDING: "border-t-3 border-t-gray-500",
    ON_HOLD: "border-t-3 border-t-orange-500",
    IN_PROGRESS: "border-t-3 border-t-primary-500",
    UNDER_REVIEW: "border-t-3 border-t-blue-500",
    COMPLETED: "border-t-3 border-t-green-500"
};

const statuses = taskStatus.enumValues.map((status, index) => {
    return {
        id: index + 1,
        status,
        label: statusLabels[status],
    };
});

type Props = {
    tasks: SelectTask[];
};

export default function KanbanBoard({tasks}: Props) {
    const tasksByStatus = groupTasksByStatus(tasks);

    return (
        <div className="no-scrollbar mt-10 flex min-h-0 flex-1 items-stretch gap-5 overflow-x-auto overflow-y-hidden">
            {statuses.map(status => (
                <div key={status.id} className={classNames(classes[status.status], "flex min-h-0 min-w-58 flex-1 shrink-0 flex-col bg-gray-50 p-3 shadow-lg")}>
                    <p className="shrink-0 text-xs font-semibold tracking-wider text-gray-600 uppercase whitespace-nowrap">{status.label}</p>

                    <ul className="mt-3 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto no-scrollbar">
                        {tasksByStatus[status.status].map(task => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
