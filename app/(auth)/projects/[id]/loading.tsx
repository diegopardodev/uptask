import { Skeleton } from "@/src/shared/components/ui/Skeleton";

const detailRows = [
    { label: "w-12", value: "w-24" },
    { label: "w-16", value: "w-28" },
    { label: "w-18", value: "w-32" }
];

const tabs = ["w-20", "w-14", "w-14"];

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <div aria-hidden="true" className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-32 max-w-full" />
            </div>

            <div
                aria-hidden="true"
                className="mt-10 flex flex-col justify-start md:flex-row md:justify-between md:items-start"
            >
                <div className="w-full md:max-w-2xl">
                    <Skeleton className="h-3 w-24 mb-3" />
                    <Skeleton className="h-9 md:h-12 w-52 md:w-80 max-w-full" />

                    <div className="mt-5 space-y-2">
                        <Skeleton className="h-5 md:h-7 w-full" />
                        <Skeleton className="h-5 md:h-7 w-3/4" />
                    </div>
                </div>

                <div className="mt-5 md:mt-0 flex items-center gap-3 w-full md:w-fit shrink-0">
                    <Skeleton className="h-9.5 md:h-10.5 w-full md:w-33" />
                    <Skeleton className="size-9.5 shrink-0" />
                </div>
            </div>

            <div aria-hidden="true" className="mt-5 md:hidden">
                <Skeleton className="h-10.5 w-full" />
            </div>

            <div aria-hidden="true" className="hidden md:block mt-10">
                <div className="flex space-x-4 bg-gray-100 p-1 w-fit rounded-md">
                    {tabs.map((width, index) => (
                        <Skeleton key={index} className={`h-9 ${width}`} />
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-10">
                <div />

                <aside className="border border-gray-200 p-5 rounded-md space-y-5">
                    <Skeleton className="h-4 w-28" />

                    <div className="flex flex-col items-center justify-between space-y-3">
                        {detailRows.map((row) => (
                            <div key={row.label} className="flex items-center justify-between w-full">
                                <Skeleton className={`h-4 ${row.label}`} />
                                <Skeleton className={`h-4 ${row.value}`} />
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}
