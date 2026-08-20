"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "@/src/shared/components/ui/Button";
import { useTaskStore } from "../store";
import CreateTaskDialog from "./CreateTaskDialog";
import KanbanBoard from "./KanbanBoard";

type Props = {
    canAddTask: boolean;
};

export default function Tasks({canAddTask}: Props) {
    const { setOpen } = useTaskStore();

    if (!canAddTask) return null;

    return (
        <div className="mt-5 flex min-h-0 flex-1 flex-col">
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

            <CreateTaskDialog />
            <KanbanBoard />
        </div>
    );
}
