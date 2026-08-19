import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { SelectProject } from "../types";
import { formatCreatedDate } from "@/src/shared/utils/date";
import Badge from "./Badge";

type Props = {
    project: SelectProject;
    userId: string;
};

export default async function ProjectCard({project, userId}: Props) {

    return (
        <div className="rounded-md border border-gray-200 w-full p-5 flex flex-col justify-between min-h-50 hover:scale-101 transition-transform ease-in-out duration-300">
            <div className="space-y-1 flex items-start justify-between">
                <div>
                    <span className="uppercase text-xs text-gray-500 font-medium tracking-wider">{project.client}</span>
                    <Link href={`/projects/${project.id}`} className="font-medium hover:underline block font-sans">{project.name}</Link>
                </div>
                {project.createdBy === userId ? <Badge>Manager</Badge> : <Badge>Collaborator</Badge>}
            </div>

            <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>

            <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                    <CheckCircleIcon className="size-3 text-gray-500" />
                    {/* TODO: Update with real tasks */}
                    <p className="text-gray-500 text-sm">15 of 20 tasks</p>
                </div>

                <p className="text-gray-500 text-sm">{formatCreatedDate(project.createdAt!)}</p>

                {/* TODO: Add loading bar based on tasks remaining */}
            </div>
        </div>
    );
}
