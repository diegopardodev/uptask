import { taskStatus } from "@/src/db/schema";
import { classNames } from "@/src/shared/utils/ui";

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

export default function KanbanBoard() {
    return (
        <div className="no-scrollbar mt-10 flex min-h-0 flex-1 items-stretch gap-5 overflow-x-auto">
            {statuses.map(status => (
                <div key={status.id} className={classNames(classes[status.status], "min-w-58 flex-1 shrink-0 bg-gray-50 p-3 shadow-lg")}>
                    <p className="text-xs font-semibold tracking-wider text-gray-600 uppercase whitespace-nowrap">{status.label}</p>
                </div>
            ))}
        </div>
    );
}
