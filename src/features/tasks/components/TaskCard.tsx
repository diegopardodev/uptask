import { Bars3Icon, CalendarIcon } from "@heroicons/react/24/outline";
import { SelectTask } from "../types";
import { formatDate } from "@/src/shared/utils/date";

type Props = {
    task: SelectTask;
};

export default function TaskCard({task}: Props) {
    return (
        <div className="shrink-0 border border-gray-200 p-3 rounded-md shadow-md flex justify-between gap-5">
            <div className="flex flex-col gap-y-3">
                <p className="text-sm font-medium line-clamp-2">{task.name}</p>
                <div className="flex items-center gap-2 text-gray-500">
                    <CalendarIcon className="size-4" />
                    <p className="text-sm">{formatDate(task.createdAt)}</p>
                </div>
            </div>

            <div>
                <Bars3Icon className="size-4 text-gray-500" />
            </div>
        </div>
    );
}
