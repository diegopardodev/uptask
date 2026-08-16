import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function EmptyState() {
    return (
        <div className="mt-10 md:mt-20 text-center border-2 border-dashed border-gray-300 py-10 px-5 rounded-md">
            <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="mx-auto size-12 text-gray-400 dark:text-gray-500"
            >
                <path
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects yet</h3>
            <p className="mt-1 text-sm text-gray-500">Create a project to start planning your team&apos;s work.</p>
            <div className="mt-6">
                <Link
                    href="/projects/new"
                    className="inline-flex items-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary-600 hover:cursor-pointer transition-colors ease-in-out duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                    <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    Create a project
                </Link>
            </div>
        </div>
    );
}
