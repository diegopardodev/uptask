"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { classNames, currentPath } from "../../utils/ui";

const links = [
    {
        id: 1,
        label: "Dashboard",
        href: "/"
    },
    {
        id: 2,
        label: "Projects",
        href: "/projects"
    },
    {
        id: 3,
        label: "My tasks",
        href: "/my-tasks"
    },
];

export default function MobileNavigation() {
    const pathname = usePathname();

    return (
        <div className="space-y-1 pt-2 pb-3">
            {links.map(link => (
                <Link
                    key={link.id}
                    href={link.href as Route}
                    className={classNames(currentPath(link.href, pathname) ? "block border-l-4 border-primary-500 bg-indigo-50 py-2 pr-4 pl-3 text-base font-medium text-primary-600" : "block border-l-4 border-transparent py-2 pr-4 pl-3 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700")}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
