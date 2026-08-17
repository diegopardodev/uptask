import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SelectProject } from "../types";
import { formatCreatedDate } from "@/src/shared/utils/date";

type Props = {
    project: SelectProject;
};

export default function ProjectCard({project}: Props) {
    return (
        <div className="rounded-md border border-gray-200 w-full p-5 flex flex-col justify-between min-h-50">
            <div className="space-y-1">
                <span className="uppercase text-xs text-gray-500">{project.client}</span>
                <Link href="#" className="font-semibold hover:underline block">{project.name}</Link>
            </div>

            <p className="text-gray-500 text-sm">{project.description}</p>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <CheckCircleIcon className="size-3 text-gray-500" />
                    {/* TODO: Update with real tasks */}
                    <p className="text-gray-500 text-sm">15 of 20 tasks</p>
                </div>

                <p className="text-gray-500 text-sm">{formatCreatedDate(project.createdAt!)}</p>
            </div>
        </div>
    );
}
