"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "@/src/shared/components/ui/Button";
import { useTaskStore } from "../store";
import CreateTaskDialog from "./CreateTaskDialog";
import KanbanBoard from "./KanbanBoard";
import { SelectTask } from "../types";

type Props = {
    canAddTask: boolean;
    tasks: SelectTask[]
};

export default function Tasks({canAddTask, tasks}: Props) {
    const { setOpen } = useTaskStore();

    return (
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
            {canAddTask && (
                <div className="flex shrink-0 justify-end">
                    <Button
                        onClick={() => setOpen(true)}
                        variant="primary"
                        className="flex items-center gap-2 justify-center md:justify-end w-full md:w-fit"
                    >
                        <PlusIcon className="size-4" />
                        Add task
                    </Button>
                </div>
            )}

            <CreateTaskDialog />
            <KanbanBoard tasks={tasks} />
        </div>
    );
}
