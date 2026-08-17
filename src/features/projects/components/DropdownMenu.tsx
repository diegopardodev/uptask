"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import DeleteProject from "./DeleteProject";
import { useProjectStore } from "../store";
import Button from "@/src/shared/components/ui/Button";
import { SelectProject } from "../types";

type Props = {
    project: SelectProject;
};

export default function DropdownMenu({project}: Props) {
    const { setOpen, setProject } = useProjectStore();

    return (
        <>
            <Menu as="div" className="relative inline-block">
                <MenuButton className="flex items-center rounded-md text-gray-400 hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 border p-2 hover:cursor-pointer">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon aria-hidden="true" className="size-5" />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
                >
                    <div className="py-1">
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                            >
                                Add collaborator
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <Button
                                variant="destructive_menu"
                                onClick={() => {
                                    setProject(project);
                                    setOpen(true);
                                }}
                                className="flex items-center gap-2"
                            >
                                Delete project
                            </Button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>

            <DeleteProject />
        </>
    );
}
