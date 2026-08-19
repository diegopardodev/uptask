"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { classNames } from "../../utils/ui";

type Tabs = {
    name: string;
    value: string;
};

type Props = {
    tabs: Tabs[];
};

export default function Tabs({ tabs }: Props) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const current = searchParams.get("tab") ?? tabs[0].value;

    const buildHref = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === "overview") params.delete("tab");
        else params.set("tab", value);

        const query = params.toString();
        return (query ? `${pathname}?${query}` : pathname) as Route;
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:hidden mt-5">
                <select
                    id="tabs"
                    value={current}
                    onChange={e => router.replace(buildHref(e.target.value), { scroll: false })}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name} value={tab.value}>{tab.name}</option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                />
            </div>
            <div className="hidden md:block mt-10">
                <nav aria-label="Tabs" className="flex space-x-4 bg-gray-100 p-1 w-fit rounded-md">
                    {tabs.map((tab) => (
                        <Link
                            scroll={false}
                            key={tab.name}
                            href={buildHref(tab.value)}
                            aria-current={current === tab.value ? "page" : undefined}
                            className={classNames(
                                current === tab.value
                                    ? "bg-white text-black font-semibold"
                                    : "",
                                "rounded-md px-3 py-2 text-sm font-medium text-center",
                            )}
                        >
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}
