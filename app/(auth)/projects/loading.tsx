import { Skeleton } from "@/src/shared/components/ui/Skeleton";

function ProjectCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="space-y-6 p-6">
                <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                        <Skeleton className="h-2.5 w-14" />
                        <Skeleton className="h-4 w-52.5 max-w-full" />
                    </div>
                    <Skeleton className="h-5.5 w-16 shrink-0 rounded-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-2.5 w-full" />
                    <Skeleton className="h-2.5 w-2/3" />
                </div>

                <div className="flex items-center justify-between">
                    <Skeleton className="h-2.5 w-22.5" />
                    <Skeleton className="h-2.5 w-11" />
                </div>
            </div>

            <div className="h-0.75 w-full bg-gray-100" />
        </div>
    );
}

export default function Loading() {
    return (
        <div role="status" aria-label="Loading" className="w-full">
            <Skeleton aria-hidden="true" className="h-9 md:h-12 w-32 md:w-48" />
            <Skeleton aria-hidden="true" className="mt-2 h-5 md:h-7 w-52 md:w-72 max-w-full" />

            <div aria-hidden="true" className="mt-8 md:mt-9">
                <div className="space-y-3.5 sm:hidden">
                    <Skeleton className="h-10.5 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>

                <div className="hidden sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <Skeleton className="h-9.5 w-75 max-w-full" />
                        <Skeleton className="h-9.5 w-32" />
                        <Skeleton className="h-9.5 w-36" />
                    </div>
                    <div className="flex items-center gap-3.5">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-9.5 w-19" />
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="mt-6 md:mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
            >
                {Array.from({ length: 9 }).map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}
