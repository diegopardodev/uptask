"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import Button from "@/src/shared/components/ui/Button";
import { useTaskStore } from "../store";
import CreateTaskDialog from "./CreateTaskDialog";

export default function Tasks() {
    const { setOpen } = useTaskStore();

    return (
        <div className="mt-5">
            <div className="flex justify-end">
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
        </div>
    );
}
