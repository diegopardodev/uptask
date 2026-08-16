import { Skeleton } from "@/src/shared/components/ui/Skeleton";

const stats = ["w-20", "w-28", "w-24", "w-32"];
const rows = ["w-64", "w-48", "w-72", "w-40", "w-56"];

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-56 md:w-64" />

            <div aria-hidden="true" className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((width) => (
                    <div
                        key={width}
                        className="rounded-lg bg-white p-5 shadow-sm outline outline-black/5"
                    >
                        <Skeleton className={`h-4 ${width}`} />
                        <Skeleton className="mt-3 h-8 w-16" />
                    </div>
                ))}
            </div>

            <Skeleton aria-hidden="true" className="mt-10 h-6 md:h-7 w-40" />

            <div
                aria-hidden="true"
                className="mt-5 divide-y divide-gray-200 rounded-lg bg-white shadow-sm outline outline-black/5"
            >
                {rows.map((width) => (
                    <div key={width} className="flex items-center gap-4 px-5 py-4">
                        <Skeleton className="size-5 shrink-0 rounded-full" />
                        <Skeleton className={`h-4 ${width} max-w-full`} />
                        <Skeleton className="ml-auto h-6 w-16 shrink-0 rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
