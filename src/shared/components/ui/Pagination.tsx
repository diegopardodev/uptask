"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils/ui";

type Props = {
    currentPage: number;
    totalPages: number;
};

export default function Pagination({currentPage, totalPages}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const buildHref = (page: number): Route => {
        const params = new URLSearchParams(searchParams);
        if (page === 1) params.delete("page");
        else params.set("page", String(page));

        const query = params.toString();
        return (query ? `${pathname}?${query}` : pathname) as Route;
    };

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
            { currentPage > 1 && (
                <Link href={buildHref(currentPage - 1)}>
                    <ChevronLeftIcon className="size-4" />
                </Link>
            ) }

            {pages.map(page => (
                <Link
                    key={page}
                    href={buildHref(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                    className={classNames("size-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors", page === currentPage ? "bg-primary-500 text-white" : "text-gray-500 hover:bg-gray-100")}
                >
                    {page}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link href={buildHref(currentPage + 1)} aria-label="Next page" className="p-2 text-gray-500 hover:text-primary-500 transition-colors">
                    <ChevronRightIcon className="size-4" />
                </Link>
            )}
        </nav>
    );
}
