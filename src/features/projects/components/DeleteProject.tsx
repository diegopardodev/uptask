"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ExclamationTriangleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useProjectStore } from "../store";
import Button from "@/src/shared/components/ui/Button";

export default function DeleteProject() {
    const router = useRouter();
    const { open, setOpen, project } = useProjectStore();

    const close = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        const res = await fetch("/api/user/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: project?.id })
        });

        close();

        if (!res.ok) return toast.error("Couldn't delete project.");

        toast.success("Project deleted.");
        router.push("/projects");
        router.refresh();
    };

    return (
        <Dialog open={open} onClose={close} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-md sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="flex gap-5">
                            <ExclamationTriangleIcon className="size-10 shrink-0 bg-red-100 rounded-full p-2 text-red-500" />
                            <div className="space-y-2">
                                <p className="font-bold text-base">Delete this project?</p>
                                <span className="text-sm text-gray-500">{project?.name} and all 12 of its tasks will be permanently deleted. This can&apos;t be undone.</span>
                                <div className="flex items-center gap-3 mt-4">
                                    <Button variant="neutral" onClick={close}>Cancel</Button>
                                    <Button
                                        variant="destructive"
                                        className="flex items-center gap-2"
                                        onClick={handleDelete}
                                    >
                                        <TrashIcon className="size-4 text-white" />
                                        Delete project
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}
