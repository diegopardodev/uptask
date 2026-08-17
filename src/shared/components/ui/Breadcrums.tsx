"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const ROUTE_LABELS: Record<string, string | undefined> = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/projects/new": "New project",
    "/my-tasks": "My tasks"
};

type Props = {
    labels?: Record<string, string | undefined>;
    includeRoot?: boolean;
};

function humanize(segment: string) {
    const text = decodeURIComponent(segment).replace(/[-_]/g, " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Breadcrums({ labels, includeRoot = false }: Props) {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        return {
            href,
            name: labels?.[segment] ?? ROUTE_LABELS[href] ?? humanize(segment),
            current: index === segments.length - 1
        };
    });

    if (includeRoot && pathname !== "/") {
        crumbs.unshift({ href: "/", name: "Dashboard", current: false });
    }

    return (
        <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex flex-wrap items-center gap-y-1">
                {crumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center">
                        {index !== 0 && (
                            <ChevronRightIcon aria-hidden="true" className="mx-2 size-5 shrink-0 text-gray-400" />
                        )}
                        {crumb.current ? (
                            <span aria-current="page" className="block max-w-60 truncate text-sm font-medium text-black">
                                {crumb.name}
                            </span>
                        ) : (
                            <Link
                                href={crumb.href as Route}
                                className="block max-w-60 truncate text-sm font-medium text-gray-500 hover:text-gray-700"
                            >
                                {crumb.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
