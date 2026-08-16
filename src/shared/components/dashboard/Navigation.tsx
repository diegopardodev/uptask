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

export default function Navigation() {
    const pathname = usePathname();

    return (
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {links.map(link => (
                <Link
                    key={link.id}
                    href={link.href as Route}
                    className={classNames(currentPath(link.href, pathname) ? "border-primary-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700", "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium")}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
